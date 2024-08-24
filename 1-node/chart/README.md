### Directory Structure

Here's how the Helm chart structure will look:

```bash
node-app/
├── Chart.yaml
├── values.yaml
├── values-dev.yaml
├── values-prod.yaml
└── templates/
    ├── namespace.yaml
    ├── deployment.yaml
    ├── service.yaml
    ├── configmap.yaml
    ├── secret.yaml
    └── hpa.yaml
```

Deploying with Helm
To deploy this application using Helm, follow these steps:

1. Package the Helm Chart:

```bash
helm package node-app
```

2. Install/Upgrade in Development Environment:

> Use values-prod.yaml for prod env

```bash
helm install node-app ./node-app-0.1.0.tgz -f values-dev.yaml

# For upgrades:
helm upgrade node-app ./node-app-0.1.0.tgz -f values-dev.yaml
```

3. Example Deployment

```bash
# Install/Upgrade for Development
helm upgrade --install node-app ./node-app-0.1.0.tgz -f values-dev.yaml

# Install/Upgrade for Production
helm upgrade --install node-app ./node-app-0.1.0.tgz -f values-prod.yaml
```
