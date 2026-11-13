require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Native iOS SDK (btt-swift-sdk), resolved through Swift Package Manager.
# An app can pin a different version by defining these constants in its Podfile
# before `use_native_modules!`.
unless defined?(BTT_SWIFT_GIT_URL)
  BTT_SWIFT_GIT_URL = "https://github.com/blue-triangle-tech/btt-swift-sdk.git"
  BTT_SWIFT_VERSION = "3.16.0"
end

# `spm_dependency` and `install_modules_dependencies` are provided by React Native's
# `react_native_pods.rb`. `spm_dependency` was added in React Native 0.75, which is the
# minimum version this SDK supports (CocoaPods trunk is no longer used for btt-swift-sdk).
unless respond_to?(:spm_dependency, true) && respond_to?(:install_modules_dependencies, true)
  raise Pod::Informative, <<~MSG
    [react-native-btt-sdk] React Native 0.75 or newer is required.
    The Blue Triangle iOS SDK is integrated through Swift Package Manager using React Native's
    `spm_dependency` helper, which is not available in this React Native version.
    Please upgrade React Native to 0.75 or newer.
  MSG
end

Pod::Spec.new do |s|
  s.name         = "react-native-btt-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "15.0" }
  s.source       = { :git => "https://github.com/blue-triangle-tech/react-native-btt-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  spm_dependency(s,
    url: BTT_SWIFT_GIT_URL,
    requirement: { kind: "exactVersion", version: BTT_SWIFT_VERSION },
    products: ["BlueTriangle"]
  )

  # Adds React-Core and, when the New Architecture is enabled, the codegen / TurboModule dependencies.
  install_modules_dependencies(s)
end
