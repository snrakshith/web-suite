Update and Reload Configuration:
If you make changes to kong.yml, reload the configuration using:

> curl -X POST http://localhost:8001/config --data-binary @kong.yml

```bash
curl -X GET http://localhost:8001/services
curl -X GET http://localhost:8001/routes

```

- docker compose up
- docker-compose up -d
- docker compose up --build
- docker compose down
- docker compose restart

---

It seems Kong is having trouble locating or reading the `kong.yml` file specified in the `KONG_DECLARATIVE_CONFIG` environment variable. Let's address the issues step-by-step:

### Revised `docker-compose.yml`

1. **Ensure File Exists**: Make sure the `kong.yml` file is in the correct location on the host machine and is being mounted properly into the container.

2. **Correct Volume Mounting**: Ensure that the file path in the container matches the path specified in the `KONG_DECLARATIVE_CONFIG` environment variable.

Here’s a revised `docker-compose.yml` that ensures the file is mounted correctly:

```yaml
version: "3.8"

services:
  kong:
    image: kong/kong-gateway:3.4.3.12
    container_name: kong
    environment:
      KONG_DATABASE: "off"
      KONG_PROXY_ACCESS_LOG: "/dev/stdout"
      KONG_ADMIN_ACCESS_LOG: "/dev/stdout"
      KONG_PROXY_ERROR_LOG: "/dev/stderr"
      KONG_ADMIN_ERROR_LOG: "/dev/stderr"
      KONG_ADMIN_LISTEN: "0.0.0.0:8001,0.0.0.0:8444 ssl"
      KONG_DECLARATIVE_CONFIG: "/home/kong/kong.yml"
      KONG_ADMIN_GUI_HOST: "0.0.0.0"
      KONG_ADMIN_GUI_PORT: "8002"
    ports:
      - "8000:8000" # Proxy port
      - "8443:8443" # HTTPS proxy port
      - "8001:8001" # Admin API port
      - "8444:8444" # HTTPS Admin API port
      - "8002:8002" # Kong Manager GUI port
    volumes:
      - ./kong.yml:/home/kong/kong.yml
    networks:
      - kong-net

networks:
  kong-net:
    driver: bridge
```

### Steps to Resolve the Issue

1. **Ensure `kong.yml` Exists**:
   Make sure the `kong.yml` file is in the same directory as your `docker-compose.yml`. The path `./kong.yml` in the `volumes` section should correctly map to the file in your local directory.

2. **Check File Permissions**:
   Ensure that the file permissions allow Docker to read the file. You can use:

   ```bash
   chmod 644 kong.yml
   ```

3. **Restart Docker Compose**:
   Bring down the existing containers and bring them back up with the updated configuration:

   ```bash
   docker-compose down
   docker-compose up -d
   ```

4. **Check Logs**:
   If the issue persists, check the logs for more detailed error messages:

   ```bash
   docker logs kong
   ```

5. **Manual Configuration Upload**:
   If you still encounter issues, you can try to manually load the configuration using the Kong Admin API after starting Kong:

   ```bash
   curl -X POST http://localhost:8001/config --data-binary @kong.yml
   ```

   Ensure that Kong is running and accessible before making this request.

### Explanation

- **Volume Mounting**: The `volumes` section ensures that the `kong.yml` file from your local directory is mounted into the container at `/home/kong/kong.yml`. This should match the path specified in `KONG_DECLARATIVE_CONFIG`.

- **File Permissions**: Ensuring correct file permissions prevents access issues.

- **Restarting Containers**: Restarting containers applies the new configuration and ensures that the correct file paths and permissions are in effect.

By ensuring the configuration file is correctly mapped and readable, you should be able to resolve the issue and start Kong successfully in DB-less mode.
