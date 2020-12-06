FROM yasuoyuhao/node-docker-image-with-tini:12-alpine

RUN mkdir -p /api
WORKDIR /api

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

ENTRYPOINT [ "yarn" ]
CMD ["start:prod"]