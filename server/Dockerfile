# Dockerfile for backend
FROM node:16.13

WORKDIR /usr/

COPY package*.json ./
COPY webpack.config.js ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY ./server/ .

EXPOSE 3000

CMD [ "npx", "ts-node", "/usr/server.ts" ]
