# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] Blue Triangle - Latest
- Updated native SDKs: iOS BlueTriangleSDK-Swift 3.16.0, Android btt-android-sdk 2.20.0.
- Fixed custom network tracking host and domain extraction issue from network URLs
- iOS (React Native 0.75+): native SDK is pulled directly from GitHub via Swift Package Manager and (React Native < 0.75): native SDK is resolved from CocoaPods.

## [0.4.1] Blue Triangle July 29 2026
- Added support for tracking Crashes appearing in Javascript.
- Fixed Launch time issue in Android
- Changed Traffic Segment name and Page type to "ScreenTracker" for Automatic Screen Tracking payloads
- Sending custom variables along with error payloads

## [0.4.0] Blue Triangle - May 21 2025

### New Features
- Added support for Blutriange and Microsoft clarity session mapping. Added ability to detect clarity sdk present in host app, if present associate clarity session url with timers
- Added ability to disabling or enabling the SDK through the remote configuration system, providing full control over its functionality in real-time. When the SDK is disabled, all features, including data collection, processing, and network operations, are suspended.
- Ability to remotely ignore automatically tracked screen names. Developers can configure a list of page names from the BlueTriangle portal, which will be ignored from tracking.
- Ability to remotely overwrite Network Sample Rate.
- Added support for Custom Variables
- Adding support for collecting Cellular Network Type
- Adding support for collecting Device Model

## [0.3.0] Blue Triangle - June 15 2024

### New Features
- Added PurchaseConfirmation class to collect revenue data

## [0.2.1] Blue Triangle - June 5 2024

### New Features
- Automatic Hot and Cold Launch Time Tracking
### Feature Improvements
- SDK can now be configured with only the Site ID, with all stat tracking enabled by default

## [0.1.0] Blue Triangle - April 10 2024

## New Features
- Manual Timers
- CPU and Memory usage monitoring
- Memory Warning
- ANR wornning
- Screen Tracking with React Navigation and Manual
- Crash Tracking
- Offline Caching
- Network state capture
- HTTP Requests tracking
- WebView tracking

## [0.0.1] - 2023-10-17

### Added
- Steps to install local sdk to project.
- Configuration used to configure BTT SDK.
- Manual Timer used to track the time between start and end timer.
- Cart Value used set cart value for the timer.
- Performance Monitor used to track memory and cpu usage during timer.
- Screen tracking is used to track currently active screen.
- Crash tracking is used to track native and js crash.
