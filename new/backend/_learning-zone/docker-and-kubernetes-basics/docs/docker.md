# Docker

# Build

```bash
    # Syntax
    docker build -tag app-name .

    # ex:
    docker build -t react-app .

    # -t tag
    # react-app app-name
    # . destination
```

# To print env variables

- printenv
- echo `$env_name`

# docker compose

- docker-compose up, `used to start app container`
- docker-compose down, `used to stop app container`

```bash

docker images
docker ps
docker image -rm <image.id>
docker container -rm -f $(docker container ls -q)

docker ps -a
    - v for volume mapping
    - p for port mapping
docker network ls
#  by default we have
    # - bridge
    # - host
    # - none

```

### Save and load

> Its always saves to a current directory

- save

  - docker image save -o react-app.tar <image_name>
  - ex: docker image save -o react-app.tar react-app:3

- load

  - docker image load -i <tar.file>
  - ex: docker image load -i react-app.tar

- start a shell session on a container (web)
- ping other container (api)

- App User
  - docker exec -it <container_id> sh
- Root User
  - docker exec -it -u root <container_id> sh

# Containers

- Starting
- Stoping
- Publishing ports
- Viewing logs
- Executing commands in container
- Removing container
- Persisting data using volumes
- Sharing source code with containers

# Docker error status code

- 0 ->
- 1 -> app error
- 137 -> SIG KILL
- 143 -> SIG TERM
- 130 -> CTRL + C
- 139 -> Out of memory / SIGSEGV
- 127 -> Some typos
- 126 -> Permission error or command not exec

# Dockerfile

```bash

From -< os or runtime environment
Workdir
copy
add -> support urls & zip files
run -> used for running commands during image building
env
entrypoint
CMD -> used for running command after build
user
expose

```

- to print env variable
  - printenv
  - eco $env_name

---

- cmd is of 2 types

  - shell form ex: `cmd npm run`
  - cmd exec form ex: `["npm", "run"]`

- entrypoint is same as CMD but can be easily overridden
  - docker run -it <app_name> echo "hello"

# Cheatsheet

- To build an image from Dockerfile

```bash
docker build .
docker build -t express-app .
```

- To see all images

```bash
docker images
```

- To tag an image

```bash
docker build -t express-app:tag .
docker build -t express-app:v2 .
```

```bash
# Advance

# we can tag a image in 2 ways
# during build time
    docker run -t react-app:v3.1.5`
# after a sucessfull build
    docker image tag <image-name | id>
# ex: docker image tag react-app:v3.1.5
```

- To remove an image

```bash
# docker image (rm or remove) <image-name>:tag

docker image rm express-app:v2

# Advance

# To remove dangling image
docker image prune
docker ps -a # show stopped containers
docker container prune

# To remove a proper image
docker image rmi express-app:v2

```

- flags

```bash
docker
 -v for volume mapping
 -p for port mapping
```

- To see all the running containers

```bash
docker ps
```

- To stop a container

```bash
ctrl + c
```

- To run a container in a detached mode

```bash

docker run -d express-app .
```

- Give a name to a running container

```bash
docker run -d --name express-contianer express-app .
```

- To start a container

```bash
docker start container-name
```

- To stop a container

```bash
docker stop container-name
docker kill container-name
```

- To remove a container

```bash
docker rm container-name
```
