FROM node:16

WORKDIR /app

COPY ./api/package.json ./api/package.json
COPY ./web/package.json ./web/package.json

RUN npm install --prefix ./api
RUN npm install --prefix ./web

WORKDIR /app/web

COPY ./web ./

RUN npm run build

WORKDIR /app/api

COPY ./api ./

WORKDIR /app

RUN mv ./web/dist/* ./api/public && rm -r ./web

RUN mv ./api/* . && rm -r ./api

CMD npm run db:push && npm start
