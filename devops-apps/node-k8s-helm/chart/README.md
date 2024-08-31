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

4. Debugging

```bash
helm template --debug -f values.yaml -f values-dev.yaml .
```

5 Install

```bash
helm install my-release my-chart -f values-common.yaml -f values-dev.yaml

```

---

To debug your Helm chart using a specific environment's values file (like `values-dev.yaml`) along with the common `values.yaml`, you can use Helm's `--values` (or `-f`) flag to override the default values during the `helm template`, `helm install`, or `helm lint` commands.

### Steps to Debug Using `values-dev.yaml` and `values.yaml`

1. **Ensure Both Files Are Present**:

   - `values.yaml`: This is the default values file that contains common configuration.
   - `values-dev.yaml`: This file contains environment-specific overrides (e.g., for a development environment).

2. **Using `helm template`**:
   To render the templates with both `values.yaml` and `values-dev.yaml`, you can use:

   ```bash
   helm template --debug -f values.yaml -f values-dev.yaml .
   ```

   - **Explanation**:
     - `--debug`: This flag prints the generated YAML files to the console, which helps in debugging.
     - `-f values.yaml`: Specifies the base values file.
     - `-f values-dev.yaml`: Overrides the base values with environment-specific values.

3. **Using `helm lint`**:
   To lint the chart with both files:

   ```bash
   helm lint -f values.yaml -f values-dev.yaml .
   ```

   This checks the chart for errors using the combined values.

4. **Using `helm install` or `helm upgrade`**:
   When you are ready to deploy the chart:

   ```bash
   helm install my-release -f values.yaml -f values-dev.yaml .
   ```

   or for upgrading:

   ```bash
   helm upgrade my-release -f values.yaml -f values-dev.yaml .
   ```

### Order of Precedence

- Values in `values-dev.yaml` will override those in `values.yaml`.
- You can specify multiple values files, and Helm will merge them in the order specified, with the last one taking precedence.

### Debugging Tips

- **Check Rendered Output**: Use `helm template --debug` to see the fully rendered Kubernetes manifests. This will help you see how your values are being applied.
- **Environment Variables**: You can also pass environment variables using the `--set` flag for quick testing.
- **Inspect the Values**: If you're unsure which values are being used, you can inspect them by rendering them in your templates or by checking the rendered output using the `helm template` command.

By using the `--values` flag with the `helm` commands, you can easily switch between different environments and debug your Helm charts accordingly.
