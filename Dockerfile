ARG NODE_IMAGE=node:18.12.1-alpine3.16


#
## Base Stage
FROM ${NODE_IMAGE} as base-stage
WORKDIR /app


#
## Dependencies Stage
FROM base-stage as dependencies-stage

COPY .husky .husky
COPY package.json yarn.lock ./

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false


#
## Build Stage
FROM dependencies-stage as build-stage

COPY . .

RUN yarn build


#
## Release Stage
FROM base-stage AS release-stage
ENV NODE_ENV=production

COPY --from=build-stage /app/.output .output

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
