FROM node:current-alpine
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD ["node","--harmony","dist/index.js"]