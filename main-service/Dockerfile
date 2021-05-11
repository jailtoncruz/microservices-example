FROM node:14-alpine

WORKDIR /srv/main-service

COPY package.json yarn.lock ./
COPY dist/ .

RUN yarn

EXPOSE 3333

CMD ["node","index.js"]