FROM node:16.14.2

WORKDIR /usr/tallowcomics

COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
