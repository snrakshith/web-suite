# In this sample node we see various way of cicd workflow

## For CI

### Step 1

- We dockerize our node app based on the `Dockerfile`
- We tag our image
- We scan our docker image

### Step 2

- we publish it to Dockerhub
- we publish it to AWS ECR

---

## For CD

- We deploy app to EC2 machine
- We deploy app to ECS + EC2 machine
- We deploy app to ECS with Fargate
- We deploy app to EKS Cluster

### For details check [original repo](https://github.com/integrationninjas/nodejs-app)
