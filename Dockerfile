ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-alpine AS builder

RUN mkdir -p /api
WORKDIR /api

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

ENTRYPOINT [ "yarn" ]
CMD ["start:prod"]