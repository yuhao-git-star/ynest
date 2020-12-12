fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android test
```
fastlane android test
```
Build and Unit Test
### android betabuild
```
fastlane android betabuild
```
Submit a new build to apk
### android beta
```
fastlane android beta
```
Submit a new build to apk
### android betagitlab
```
fastlane android betagitlab
```
Push a new beta build to apk
### android releasebuild
```
fastlane android releasebuild
```
Submit a new build to Internal Track on Play
### android release
```
fastlane android release
```
Submit a new build to Internal Track on Play
### android releasegitlab
```
fastlane android releasegitlab
```
Submit a new build to Internal Track on Play

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
