# Quick look

- Tech stack

  - MERN
  - PERN

- Types of API protocols

  - RESTFull
  - Websockets/socket.io
  - GraphQL
  - Serverless
  - Webhook

- Types of Databases

  - MongoDB
  - Postgress

- Key concepts in GraphQL
  - Schema / typedefs
  - Resolvers

# Backend communication design patterns

1. Request response
2. push
3. short polling
4. long polling
5. Server Sent Events
6. Publish Subscribe(Pub/Sub)
7. Multiplexing and Demultiplexing
8. Stateful and Stateless
9. Sidecart pattern

---

# Pointers to remember on API's

## POST

- standard 1
  - check req fields & store
- standard 2
  - check which user is trying to create a resource
  - check for all req fields
  - check for fields types
  - check for duplication values in db
  - then store it

## Get

- standard 1
  - Pagination
- standard 2
  - check if the user is authorised to get the data. RBAC
  - Pagination
  - check for the filters via,
    - body
    - query-params

## Delete

- standard 1
  - Who is deleting / User authorized or not
  - check that specific record exists in db or not
  - then delete

```js
// @route GET api
// @desc  Get the list of all active posts
// @access Public/Private
```

---

# MongoDB

- Have you ever designed a Database schema ?
- How to optimise DB query ?
- What are the things you consider when designing a database schema?
- Auth macheninsm ?
- Server Security ?

- Pagination
- Image Upload
- patch & delete
- JWT

# code types

- synchronous
- async synchronous
  - callbacks
  - promises
  - async and await
  - try and catch

---

- Rate limiting

  - express-rate-limit

- Password Encryption
  - bcrypt

JWT blacklisting

- JSON Schema Validation

  - jsonschema

- Escaping HTML & CSS

  - escape_html

- Security linter

  - eslint-plugin-security

- ORM & ODM against Injection
  - mongoose
  - sequelize

# Tips for validations

- Schema Validations
- Token missing
- Validate
- User Token
- req.body for required field
- if the items is already present in DB based on a unquie fields (no duplicate items)
- the RBAC for a Route (ex: only admin can create)
- special fields like phone for ( phone_number )
- calculate age

---

### modules

Streams
HTTP
Path
FS

### core concepts

- CRUD
- Aggregations
- Clustering
  - sharding
  - replications
- Migrations
- DB Backups
- Cron Jobs
- Testing
  - functionality
  - load
  - contract

### Top Features

Render PDF
Upload a Doc (PDF,Image)
Payment Integration
Opentelemetry
APM & Observablity (MELT properties)
Swagger setup
logging
Error Handling
Multitenancy
Queueing System ( Kafka or RabbitMQ )
Notification System

### 3-microservices-patterns

API Gateway Pattern
Outbox Pattern
Saga Pattern
Backend for frontend (BFF)
Modular monolitic Architecture

### Benefits of having a openapi.yml file

- frontend can see the list of available enpoints
- generate client typed libraries
- generate a postman collection
- api documentation site
- mock server via openapi spec file
- postman collection to K6 for performance testing

### Integrations

- Stripe
- Textlocal
- Redis
- Logger
- Razorpay
- kafka
- Email
- Swagger
- Testing
- RabbitMQ
  - SNS
  - SQS
  - SES
- Text message
- Nodemailer

---

- Proxmox (Bare Metal)
- K3s
- Keycloak
- Kong API Gateway
- Infisical

### Node deployment options

1. Multistage build for dockerizing the node app
2. Deploy to EKS on AWS
   - Use Kubernetes as a platform
3. Get secrets for Inficiscal
4. ArgoCD for continous delivery

---

- Node deployment repos:

  - ikure-chw-devops-workflows => is a reusable github action
  - ikure-chw-devops-pipelines => is k8's repo, for managing all the deploymnet activities
  - ikure-devops-test-be => is a sample test node repo for verifying deployment

---

CI patterns

- ECR
- Docker hub

CD patterns

- without docker

  - EC2 using pm2 (bear metal)

- with docker
  - EC2
  - ECS
    - EC2
    - Fargate
  - EKS

---
