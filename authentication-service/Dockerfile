FROM node:14-alpine

WORKDIR /srv/authentication-service

COPY package.json yarn.lock ./

RUN yarn

RUN yarn build

COPY . .

EXPOSE 3333

CMD ["node","dist/index.js"]