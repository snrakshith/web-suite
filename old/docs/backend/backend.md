Rate limiting
- express-rate-limit

Password Encryption
- bcrypt

JWT blacklisting

JSON Schema Validation
- jsonschema

Escaping HTML & CSS
- escape_html

Security linter
- eslint-plugin-security

ORM & ODM against Injection
- mongoose
- sequelize

Tips for validations
=============================
- Schema Validations
- Token missing
- Validate 
 - User Token
 - req.body for required field
 - if the items is already present in DB based on a unquie fields (no duplicate items)
 - the RBAC for a Route (ex: only admin can create)
 - special fields like phone for ( phone_number )
 - calculate age






-----------------------------------


Node deployment options
================
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

-------------------------------






