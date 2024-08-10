# Use the official Node.js image as the base image
FROM node:16-alpine3.18 as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2

FROM node:16-alpine3.18 as production

ARG APP_ENV=production

ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production
# RUN npm ci --include=dev // if you still want to inclue devDependencies in production 

COPY --from=development /usr/src/app/dist ./dist

# Expose the port that the app will run on
# EXPOSE 4000

CMD [ "node" , "dist/index.js" ]


