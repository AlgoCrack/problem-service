FROM --platform=linux/amd64 node:20

ENV APP_HOME /app

WORKDIR $APP_HOME
COPY ./ $APP_HOME

EXPOSE 3000/tcp

RUN yarn prisma migrate dev

CMD yarn run start
