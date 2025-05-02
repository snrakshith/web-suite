- Services in AWS

  - VPC
  - Subnets
  - Route tables
  - NAT Gateway
  - Internet Gateway `IGW`
  - DNS
    - Hostname
    - resolution

### Other terms

    - hosted zones

- CIDER Block

```js
32-> 0
24-> 1
16-> 2
8-> 3
0-> all

=> 10.0.0.0/24 => 10.0.0.255
```

- Route 53
  - Domain Registration
  - DNS Management
  - Traffic Management
  - Availability Monitoring

### Databases

- Different DBs in AWS

  - Amazon DynamoDB
  - Amazon RDS
  - Amazon Elasticcache
  - Amazon Neptune (graph based)
  - Amazon Redshift (data warehouse)

- Managed DB service vs EC2
- OLAP vs OPTP
  - Scale vertically (OLTP)
  - Scale horizantally (OLAP)

## Simple storage service `S3`

- Global service
- Storage

  - OS installable storage is called as `Block storage`
  - OS not installable

> DB is clean installable on `Block storage`

- Operations
  - Bucket policies
  - Versioning
  - Encription
  - Static web hosting
  - Bucket visibility access / Public
