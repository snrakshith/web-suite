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
