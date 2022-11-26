ARG NODE_IMAGE=node:18.12.1-alpine3.16
#
## Build Stage
FROM ${NODE_IMAGE} as build-stage

WORKDIR /app

COPY . .

# production & develop pkgs
RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

# production only pkgs
RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true


#
## Release Stage
FROM ${NODE_IMAGE}

WORKDIR /app

COPY --from=build-stage /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
