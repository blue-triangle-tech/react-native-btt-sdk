/**
 * Formats JS errors the same way the native Blue Triangle SDKs format crashes:
 *
 * - title:      "<Name>: <message>~~<culprit frame>"
 *               (Android `Utils.exceptionToStacktrace`, iOS `bttReportMessage`)
 * - stackTrace: {"meta":{"fVersion"},"threads":[{id,name,crashed,caused,stack:[{i,fLine}]}]}
 *               (Android `CrashTraceParser.exceptionToJson`, iOS `CrashStackTraceReport`)
 */

/** Line separator used by native SDKs inside error titles. */
const LINE_SEPARATOR = '~~';

/** Must match native `TRACE_FORMAT_VERSION` / `stackTraceFormatVersion`. */
const TRACE_FORMAT_VERSION = '1.0.0';

/** Maximum depth of the `error.cause` chain, same as Android. */
const MAX_CAUSE_DEPTH = 20;

const FRAME_PREFIX = 'at ';
const JS_THREAD_ID = '0';
const JS_THREAD_NAME = 'JS Thread';
const CAUSED_BY_THREAD_NAME = 'Caused by';
const UNKNOWN_ERROR_TITLE = 'Unknown JS Error';

export type StackFrame = {
  i: number;
  fLine: string;
};

export type StackThread = {
  id: string;
  name: string;
  crashed: boolean;
  caused: string;
  stack: StackFrame[];
};

export type StackTraceReport = {
  meta: { fVersion: string };
  threads: StackThread[];
};

export type FormattedError = {
  /** Sent as the error message (`msg`). */
  title: string;
  /** JSON string sent as `NATIVEAPP.stackTrace`. */
  stackTrace: string;
};

class BTTStackTraceFormatter {
  /** @param error any thrown value */
  static format(error: unknown): FormattedError {
    const threads = BTTStackTraceFormatter.buildThreads(error);
    const report: StackTraceReport = {
      meta: { fVersion: TRACE_FORMAT_VERSION },
      threads,
    };

    return {
      title: BTTStackTraceFormatter.buildTitle(threads[0]),
      stackTrace: JSON.stringify(report),
    };
  }

  // MARK: - Title

  private static buildTitle(crashedThread: StackThread | undefined): string {
    if (!crashedThread) {
      return UNKNOWN_ERROR_TITLE;
    }

    const reason = crashedThread.caused;
    const culpritFrame = crashedThread.stack[0]?.fLine;

    const title = [reason, culpritFrame]
      .filter(BTTStackTraceFormatter.isNotBlank)
      .join(LINE_SEPARATOR);

    return title || UNKNOWN_ERROR_TITLE;
  }

  // MARK: - Threads

  /** One entry for the error and one per `error.cause`, like Android "Caused by" chains. */
  private static buildThreads(error: unknown): StackThread[] {
    const threads: StackThread[] = [];
    const seen = new Set<unknown>();
    let current: unknown = error;

    while (
      current !== undefined &&
      current !== null &&
      !seen.has(current) &&
      threads.length < MAX_CAUSE_DEPTH
    ) {
      seen.add(current);

      const index = threads.length;
      const isRoot = index === 0;
      const reason = BTTStackTraceFormatter.reasonOf(current);

      threads.push({
        id: isRoot ? JS_THREAD_ID : `caused-${index}`,
        name: isRoot ? JS_THREAD_NAME : CAUSED_BY_THREAD_NAME,
        crashed: isRoot,
        caused: isRoot ? reason : `Caused by: ${reason}`,
        stack: BTTStackTraceFormatter.parseFrames(current),
      });

      current = current instanceof Error ? (current as any).cause : undefined;
    }

    return threads;
  }

  // MARK: - Reason

  /** "TypeError: message", like Java `Throwable.toString()`. */
  private static reasonOf(error: unknown): string {
    if (error instanceof Error) {
      return BTTStackTraceFormatter.joinReason(error.name, error.message);
    }

    if (typeof error === 'object' && error !== null) {
      const { name, message } = error as { name?: unknown; message?: unknown };
      if (typeof message === 'string' && message.trim() !== '') {
        return BTTStackTraceFormatter.joinReason(name, message);
      }
      return BTTStackTraceFormatter.singleLine(
        BTTStackTraceFormatter.safeStringify(error)
      );
    }

    // Primitive thrown values, e.g. `throw 'timeout'`
    return BTTStackTraceFormatter.joinReason('Error', String(error));
  }

  private static joinReason(name: unknown, message: unknown): string {
    const type = typeof name === 'string' && name ? name : 'Error';
    const text = typeof message === 'string' ? message.trim() : '';
    return BTTStackTraceFormatter.singleLine(text ? `${type}: ${text}` : type);
  }

  // MARK: - Frames

  /**
   * Converts `error.stack` into "at fn (file:line:col)" frames.
   * Supports Hermes/V8 ("at fn (file:1:2)") and JSC ("fn@file:1:2") stacks.
   * Non-frame lines (e.g. the "TypeError: msg" header) are skipped.
   */
  private static parseFrames(error: unknown): StackFrame[] {
    const rawStack = (error as { stack?: unknown } | null)?.stack;
    if (typeof rawStack !== 'string') {
      return [];
    }

    return BTTStackTraceFormatter.lines(rawStack)
      .map(BTTStackTraceFormatter.toFrameLine)
      .filter((line): line is string => line !== undefined)
      .map((fLine, i) => ({ i, fLine }));
  }

  private static toFrameLine(line: string): string | undefined {
    // Hermes / V8
    if (line.startsWith(FRAME_PREFIX)) {
      return line;
    }

    // JSC: "functionName@file:line:col" or "@file:line:col"
    const jscFrame = /^(.*?)@(.+)$/.exec(line);
    if (jscFrame) {
      const [, functionName, location] = jscFrame;
      return functionName
        ? `${FRAME_PREFIX}${functionName} (${location})`
        : `${FRAME_PREFIX}${location}`;
    }

    // JSC anonymous frames: "file:line:col" or "[native code]"
    if (/:\d+(:\d+)?\)?$/.test(line) || line === '[native code]') {
      return `${FRAME_PREFIX}${line}`;
    }

    return undefined;
  }

  // MARK: - Helpers

  private static lines(text: string): string[] {
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  private static singleLine(text: string): string {
    return BTTStackTraceFormatter.lines(text).join(LINE_SEPARATOR);
  }

  private static safeStringify(value: unknown): string {
    try {
      return JSON.stringify(value) ?? String(value);
    } catch {
      return String(value);
    }
  }

  private static isNotBlank(value: string | undefined): value is string {
    return !!value && value.trim() !== '';
  }
}

export default BTTStackTraceFormatter;
