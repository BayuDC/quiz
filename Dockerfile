FROM node:16

WORKDIR /app/web

COPY ./web/package.json .

RUN npm install 

COPY ./web ./

RUN npm run build

WORKDIR /app/api

COPY ./api/package.json .

RUN npm install

COPY ./api ./

WORKDIR /app

RUN mv ./web/dist/* ./api/public && rm -r ./web

RUN mv ./api/* . && rm -r ./api

CMD npm run db:push && npm start
