---
description: 本篇文章將介紹 nests-general 的基本概念
---

# Nestjs-General 基本介紹

## 基本概念

`nestjs-general` 專案樣板源自於 [`nest.js` 項目](https://github.com/nestjs/nest)，在企業級應用基礎上，整理出常用的模組與設定。

> Nest是一個有用的高效，可擴展的Node.js服務器端應用程序的框架。它使用漸進式JavaScript，內置並完全支持TypeScript（但仍允許開發人員使用純JavaScript編寫代碼）並結合了OOP（面向對象編程），FP（函數式編程）和FRP（函數式響應編程）的元素。

> 在這些框架之上提供了一定程度的抽象，同時也將其 API 直接暴露給開發人員。這樣可以輕鬆使用每個平台的無數第三方模塊。

## 要求

* `node version >= 12`

## 檔案結構

├── Dockerfile

├── README.md

├── bitbucket-pipelines.yml - bitbucket 的 pipelines 設置

├── cdk-k8s - 協助您撰寫 K8s yaml 部署

├── cloudbuild.yaml - Google Cloud Build 配置

├── devspace.yaml - devspace 配置

├── docker-compose.yml - docker-compose 配置

├── src - 主要程式碼位置

│   ├── api-response - 共用的 API Response 服務與結構

│   ├── apiv1 - 版本 1 的 API

│   ├── apiv2 - 版本 2 的 API

│   ├── auth - 鑑權服務

│   ├── config - 環境配置設定，通常搭配 .env 資料夾中變數

│   ├── decorators - 常用的裝飾器

│   ├── elasticsearch-config - elasticsearch的連接設置

│   ├── enum - 常用的enum

│   ├── errors - 常用的error

│   ├── events - websocket 服務

│   ├── filter - http 攔截器服務

│   ├── interface - 常用的interface

│   ├── main.ts
│   ├── middleware - http 中間件服務

│   ├── multer - multer 上傳檔案配置

│   ├── pipe - 常用的 pipe，通常用於資料驗證

│   ├── redis - redis 連線配置

│   ├── services - services 邏輯服務層主要位置

│   ├── system-mailer - Email 信件服務

│   ├── type-orm-config - TypeORM 連線配置服務

│   └── winston - TypeORM 日誌服務

├── test - 常用的測試元件
