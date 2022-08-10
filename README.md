# TheQuiz

A simple quiz app

## Config

Open and modify `./api/data/quiz.json` and `./web/src/data/quiz.json` to change the questions and users.

## Setup

Don't forgot to set some env variable in `./api/.env`

```
# Build and run
$ docker-compuse build
$ docker-compuse up

# Fill up the database
$ docker exec -it quiz_app bash
$ npm run db:seed

```
