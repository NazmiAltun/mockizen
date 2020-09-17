FROM node:current-alpine as prod-dep
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --production 

FROM node:current-alpine as build
WORKDIR /opt/app
COPY --from=prod-dep /opt/app/node_modules ./node_modules
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:current-alpine as runtime
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=prod-dep --chown=node:node /opt/app/node_modules ./node_modules
COPY --from=build --chown=node:node /opt/app/dist ./dist
USER node
CMD ["node","--harmony","dist/index.js"]