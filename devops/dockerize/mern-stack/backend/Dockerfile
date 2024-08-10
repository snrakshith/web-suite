FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm ci

EXPOSE 8000

COPY . .

CMD ["npm", "run", "start"]