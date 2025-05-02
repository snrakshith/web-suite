# Backend workbench

# Tutorial Links on:

# SES

- [SES with Node.js + nodemailer](https://www.codu.co/articles/sending-emails-with-aws-ses-and-nodemailer-in-node-js-xfuucrri)

# Keycloak

- [Securing Express REST API with RBAC using Keycloak](https://saurav-samantray.medium.com/securing-rest-api-with-role-based-access-control-rbac-using-keycloak-part-i-nodejs-8f59be925a42)

- [Simple Keycloak RBAC with Node.js & Express.js](https://medium.com/@erinlim555/simple-keycloak-rbac-with-node-js-express-js-bc9031c9f1ba)

- [Intergate keycloak with react frontend](https://www.wedaa.tech/docs/blog/2023/12/26/Intergating-keycloak-with-react-app)

# Kong Manger

- [docker_compose.yaml file for Kong Manger](https://gist.github.com/pantsel/73d949774bd8e917bfd3d9745d71feb)

- [youtube video on Kong Manager setup and configuration](https://www.youtube.com/watch?v=Q5_hfGY672U)

---

### TypeORM integration

- packages to install

> npm i -D <package-name>

- typescript
- ts-node
- pg
- typeorm
- express
- @types/express
- nodemon

```json
"scripts":{
   "dev":"nodemon --watch './**/*.ts' --exec 'ts-node' src/index.ts"
}
```

---

## Nest.js app

### Workflow setup

```bash

npm install -g @nestjs/cli

# generate new nest app
nest new <app-name>

# create a new module
nest generate module <module-name>

# services for business logic

npm i @nestjs/typeorm typeorm sqlite3

```

```bash
# Server

#  Req flows through a -> module
#  module contains (Pipe -> Gaurd -> Controller -> Service -> Repository)
```

Nest.js

- Service => Bussiness logic
- Modules => Files
- Controllers => Routes
- Pips & DTO's => Validations
- Gaurds => user authenticated
- Repository => access to database
