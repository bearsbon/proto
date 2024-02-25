FROM node:19.8.1-buster as install
WORKDIR /front
COPY package.json .
COPY package-lock.json .
ARG NPM_CONFIG_REGISTRY=""
RUN npm ci

FROM install as build
COPY . .
RUN npm run build

FROM nginx:1.24-alpine3.17-slim
WORKDIR /var/www/html
COPY --from=build /front/target/classes/static/ ./
COPY .deploy/docker/nginx.conf /etc/nginx/templates/default.conf.template
