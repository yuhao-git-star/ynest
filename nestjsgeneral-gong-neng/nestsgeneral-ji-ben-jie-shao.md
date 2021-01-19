---
description: 本篇文章將介紹 nests-general 的基本概念
---

# Nestjs-General 基本介紹

## 基本概念

`nestjs-general` 專案樣板源自於 [`nest.js` 項目](https://github.com/nestjs/nest)，在企業級應用基礎上，整理出常用的模組與設定。

> Nest是一個有用的高效，可擴展的Node.js服務器端應用程序的框架。它使用漸進式JavaScript，內置並完全支持TypeScript（但仍允許開發人員使用純JavaScript編寫代碼）並結合了OOP（面向對象編程），FP（函數式編程）和FRP（函數式響應編程）的元素。

> 在這些框架之上提供了一定程度的抽象，同時也將其 API 直接暴露給開發人員。這樣可以輕鬆使用每個平台的無數第三方模塊。

## 檔案結構

├── Dockerfile
├── README.md
├── bitbucket-pipelines.yml - bitbucket 的 pipelines 設置
├── cdk-k8s - 協助您撰寫 K8s yaml 部署
│   ├── __snapshots__
│   │   └── main.test.ts.snap
│   ├── cdk8s.yaml
│   ├── help
│   ├── imports
│   │   └── k8s.ts
│   ├── jest.config.js
│   ├── main.test.ts
│   ├── main.ts
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── cloudbuild.yaml
├── devspace.yaml
├── docker-compose.yml
├── nest-cli.json
├── nodemon.json
├── package.json
├── src - 主要程式碼位置
│   ├── api-response - 共用的 API Response 服務與結構
│   │   ├── api-response.service.spec.ts
│   │   └── api-response.service.ts
│   ├── apiv1 - 版本 1 的 API
│   │   ├── apiv1.module.ts
│   │   └── user
│   │       ├── user.controller.spec.ts
│   │       └── user.controller.ts
│   ├── apiv2 - 版本 2 的 API
│   │   ├── apiv2.module.ts
│   │   └── user
│   │       ├── user.controller.spec.ts
│   │       └── user.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth - 鑑權服務
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── domain
│   │   │   ├── jwt.strategy.ts
│   │   │   └── strategy.module.ts
│   │   └── jwt-auth.guard.ts
│   ├── config - 環境配置設定，通常搭配 .env 資料夾中變數
│   │   ├── config.module.ts
│   │   └── config.service.ts
│   ├── decorators - 常用的裝飾器
│   │   ├── files
│   │   │   ├── csv-validator
│   │   │   │   ├── csv-validator.ts
│   │   │   │   └── field-validator.ts
│   │   │   ├── upload-csv-file.decorator.ts
│   │   │   ├── upload-image.decorator.ts
│   │   │   ├── upload-pdf-file.decorator.ts
│   │   │   └── upload-svg-file.decorator.ts
│   │   ├── inject-winston-logger-service.decorator.ts
│   │   └── tracking-id.decorator.ts
│   ├── elasticsearch-config - elasticsearch的連接設置
│   │   ├── elasticsearch-config.module.ts
│   │   ├── elasticsearch-config.service.spec.ts
│   │   └── elasticsearch-config.service.ts
│   ├── enum - 常用的enum
│   │   ├── account-type.ts
│   │   ├── api-business-code.ts
│   │   ├── file-extension-names.ts
│   │   └── gs-search-type.ts
│   ├── errors - 常用的error
│   │   ├── multer-transform-exception.ts
│   │   └── service-exceptions.interface.ts
│   ├── events - websocket 服務
│   │   ├── events.gateway.spec.ts
│   │   ├── events.gateway.ts
│   │   └── events.module.ts
│   ├── filter - http 攔截器服務
│   │   ├── http-filter.filter.spec.ts
│   │   └── http-filter.filter.ts
│   ├── interface - 常用的interface
│   │   ├── base-context.interface.ts
│   │   ├── multer-file.interface.ts
│   │   ├── user
│   │   │   ├── query
│   │   │   │   ├── user-query.ts
│   │   │   │   └── user-signin-data-query.interface copy.ts
│   │   │   └── response
│   │   │       └── user-signin.interface.ts
│   │   └── user-id.interface.ts
│   ├── main.ts
│   ├── middleware - http 中間件服務
│   │   ├── http-logger.middleware.spec.ts
│   │   └── http-logger.middleware.ts
│   ├── multer - multer 上傳檔案配置
│   │   ├── multer-config.service.ts
│   │   └── multer.module.ts
│   ├── pipe - 常用的 pipe，通常用於資料驗證
│   │   ├── date-time.pipe.ts
│   │   ├── general-validation.pipe.spec.ts
│   │   ├── general-validation.pipe.ts
│   │   ├── integer.pipe.ts
│   │   └── string.pipe.ts
│   ├── redis - redis 連線配置
│   │   └── redis-client
│   │       ├── redis-client.module.ts
│   │       ├── redis-client.service.spec.ts
│   │       └── redis-client.service.ts
│   ├── services - 邏輯服務層主要位置
│   │   ├── date-time
│   │   │   ├── date-time.service.spec.ts
│   │   │   └── date-time.service.ts
│   │   ├── service.module.ts
│   │   └── user
│   │       ├── user.service.spec.ts
│   │       └── user.service.ts
│   ├── system-mailer - 信件服務
│   │   ├── mailer-config
│   │   │   └── mailer-config.service.ts
│   │   ├── system-mailer.module.ts
│   │   └── system-mailer.service.ts
│   ├── type-orm-config - TypeORM 連線配置服務
│   │   ├── type-orm-config.module.ts
│   │   ├── type-orm-config.service.spec.ts
│   │   └── type-orm-config.service.ts
│   └── winston - TypeORM 日誌服務
│       ├── __mocks__
│       │   └── logger-helper.service.ts
│       ├── appwinston.module.ts
│       └── logger-helper.service.ts
├── test - 常用的測試元件
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
│   ├── mock-test-service.module.ts
│   ├── mock-test.module.ts
│   └── mockRepository.ts
├── tsconfig.build.json
├── tsconfig.json
├── tslint.json
├── webpack.config.js
└── yarn.lock
