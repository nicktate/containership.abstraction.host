FROM mhart/alpine-node:8.2

WORKDIR /app
ADD . /app

RUN npm install

ENTRYPOINT ["node", "index.js"]
