# MISC

## Table of Contents

- _[Cloud Computing Interview Questions](cloud.md)_
- _[Docker Interview Questions](docker.md)_
- _[Docker Workshop](docker-practice.md)_
- _[Docker Command Cheatsheet](docker-commands.md)_
- _[Kubernetes Workshop](kubernetes-workshop.md)_
- _[Kubectl Command Cheatsheet](kubectl-commands.md)_
- _[Kubernetes Interview Questions](kubernetes.md)_

## Link for AWS secrets manager

- https://xd04.medium.com/aws-secrets-manager-nodejs-8ff19bc13e3b

- https://allenhwkim.medium.com/aws-secret-manager-create-and-read-in-5-minutes-2448540d8952

- https://medium.com/@svsh227/connect-and-get-secrets-from-aws-secrets-manager-in-your-nodejs-app-b754aad0dae0

## Advanced

- https://medium.com/globant/cutting-aws-secret-manager-costs-caching-key-management-5a1fb823a4e0

---

## Devops

- n8n
- proxmox
- uptime kuma for monitoring server & status pages

---

## AWS

- ec2 (elastic cloud compute)
- ebs (elastic block storage)
- elb (elastic load balancer)
- asg ( security group)

vertical scaling => up & down
horizantol scaling => out(add) & in(remove)

---

## Docker

- docker run -d --name <container_name> <image_name>
- docker logs <container_id> -flags
  -n
  -t
  -f

- docker run -d --name <container_name> <image_name> -p 80:3000

  - 80 is system host
  - 3000 is docker host

- docker exec -it <container_name> <cmd>

  - docker exec -it <react_container> sh /app$ /app $ls
  - once done with your task type in exit

- docker stop <container_name>
- docker start <container_name>

- Difference b/w docker run & docker start

  - with `docker run`, you can start a new container
  - with `docker start`, you can start a stopped container

---

- docker container rm <container_name>

- Shortcut

  - docker rm <container_name>
  - docker rm -f <container_name>

- To get rid of all, the stopped containers

  - docker container prune

- To copy file from container to host & vice versa
