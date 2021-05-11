FROM node:14-alpine

WORKDIR /srv/logger-service

COPY package.json yarn.lock ./
COPY dist/ .

RUN yarn

EXPOSE 3332

CMD ["node","index.js"]