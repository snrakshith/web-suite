FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm ci

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start"]