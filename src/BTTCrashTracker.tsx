import BttSdk from './BttSdk';

class BTTCrashTracker {
  static init() {
    const prevError = ErrorUtils.getGlobalHandler?.();

    ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
      const errorPayload = {
        message: error.message,
        stack: error.stack,
        isFatal: isFatal,
        timestamp: Date.now().toString(),
      };

      console.log('JS Error Captured by BTTCrashTracker:', errorPayload.stack);

      // console.log(error.stack);
      let result = BTTCrashTracker.exceptionToStacktrace(error.message, error);
      console.log(result);
      // passing the result to sdk
      BttSdk.trackJsError(result);

      // Call previous handler to preserve default behavior
      if (typeof prevError === 'function') {
        prevError(error, isFatal);
      } else {
        console.log('Failed to capture Error!');
      }
    });
  }

  private static exceptionToStacktrace(message: string, error: any) {
    const resultLines = [];
    const rawStack = new String(error?.stack);
    const lines = rawStack
      .split(/\r?\n/) // splits on newline
      .map((line) => line.trim()) // removes starting and ending spaces from each line
      .filter(Boolean); // removes empty lines

    // checks if error is availble , and if available then its not duplicate, then only push
    if (message && message !== error?.message) {
      resultLines.push(message + '~~');
    }

    // this checks if the error.message avaialble, and then only push to the stack trace

    if (
      error?.message &&
      error.message.trim() !== '' &&
      !lines[0]?.includes(error.message)
    ) {
      resultLines.push(error.message.trim() + '~~');
    }

    // this loops through each line of the stack trace and adds ~ at end of every line

    lines.forEach((line, index) => {
      if (index === lines.length - 1) {
        resultLines.push(line); // last line: no separator
      } else {
        resultLines.push(line + '~~');
      }
    });

    // joins all the elements in the resultLines into single string
    return resultLines.join('');
  }
}
export default BTTCrashTracker;
