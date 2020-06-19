# nest.js-temp

這是一個快速執行 nest.js 7 的框架，包含了

* `elasticsearch`
* `typeorm`
* `Socket.io`
* `jwt`, `passport`
* `winston`
* `Custom Exception filters`
* `middleware log`
* `api-versioning`, `swagger`
* `docker`, `docker compose`
* `env`
* `redis`
* `bitbucket pipelines`
* `GCP Cloud Build`
* ``

run `dokcer-compose up --build`

## Update TypeORM

### first

`npm i -g typeorm-model-generator`

## Cloud Redis

```=sh
export REDISHOST_IP=your_redis_ip
kubectl create configmap redishost --from-literal=REDISHOST=${REDISHOST_IP}
```

## Local Redis

`docker run -p 6379:6379 redis:4.0.0`

## install to k8s need

* NODE_ENV
* REDISHOST
* PORT
