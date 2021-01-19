---
description: 本篇文章將介紹如何快速開始 yNest
---

# 快速開始

## 基本介紹

ynest, 是一個幫助項目開始的腳手架，目前包含了 nest.js、flutter 項目，內置 CI/CD 等自動化腳本設定。

[文件位置](https://github.com/yasuoyuhao/ynest/tree/655b6c2ed729c1c5e126a6b3348eb3aa34972644/yasuoyuhao.gitbook.io/ynest/README.md)  
[原始碼位置](https://github.com/yasuoyuhao/ynest)

## 基本指令

請使用以下指令快速開始：

```bash
yarn create @klearthinkk/ynest
```

或者：

```bash
npx @klearthinkk/create-ynest
```

接下來，你會看到以下選項：

```text
What project template would you like to generate? (Use arrow keys)
❯ flutter-gitlab
  nestjs-general
```

* `flutter-gitlab` 可以快速啟動一個 `flutter App`，其中包含了自動化 CI/CD，以及企業級的環境配置方式，詳細用法可以參考[這裡](https://www.appcoda.com.tw/flutter-app-%E7%92%B0%E5%A2%83%E7%AE%A1%E7%90%86/)。
* `nestjs-general` 可以快速啟動與建置一個 `nest.js App`，其中包含了自動化 CI/CD、容器化設定、TypeORM 配置、Elasticsearch、Redis、RabbitMQ與企業級的環境配置方式。

