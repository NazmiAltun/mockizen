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
COPY --from=prod-dep /opt/app/node_modules ./node_modules
COPY --from=build  /opt/app/dist ./dist
COPY --from=build /opt/app/entrypoint.sh .
RUN sed -i 's/\r$//' ./entrypoint.sh
RUN ["chmod", "+x", "./entrypoint.sh"]
CMD ./entrypoint.sh
