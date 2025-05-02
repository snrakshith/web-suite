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
