---
description: 本篇文章將介紹 flutter-gitlab 的基本概念
---

# Flutter-Gitlab 基本介紹

## 基本概念

`Flutter-Gitlab` 是基於 [`Flutter`](https://github.com/flutter/flutter) 項目所開發的快速建置模板，其中包含 `Gitlab CI` 配置，可以快速建立 `iOS` 以及 `Android` 的自動化 CI/CD 流程，詳細教學可以查看[這篇文章](https://www.appcoda.com.tw/flutter-app-%E7%92%B0%E5%A2%83%E7%AE%A1%E7%90%86/)。

## 要求

* `需安裝 flutter sdk`，[安裝位置](https://flutter.dev/docs/get-started/install?gclid=CjwKCAiAo5qABhBdEiwAOtGmbmydxDX70Dm4GvzoBQNwIbW2L3BY1jVqK71-JN3m2LHK86YT8pLjShoCDfwQAvD_BwE&gclsrc=aw.ds)
* `node version >= 12`

## 檔案結構

├── android

│ └── fastlane - Android fastlane 配置

│ ├── Appfile

│ ├── Fastfile

│ └── README.md

├── ios - ios fastlane 配置

│ └── fastlane

│ ├── Appfile

│ ├── Fastfile

│ └── README.md

└── lib - 不同環境的入口配置

├── env.dart

├── main\_prod.dart

└── main\_staging.dart

