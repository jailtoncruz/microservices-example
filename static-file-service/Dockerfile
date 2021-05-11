FROM node:14-alpine

WORKDIR /srv/static-file-service

COPY package.json yarn.lock ./
COPY dist/ .
COPY public ../public

RUN yarn

EXPOSE 3331

CMD ["node","index.js"]