# Helm Commands

#### **Basic Helm Commands**

- **Install a Chart**
  ```bash
  helm install <release-name> <chart-name>
  ```
- **Upgrade a Release**
  ```bash
  helm upgrade <release-name> <chart-name>
  ```
- **Uninstall a Release**
  ```bash
  helm uninstall <release-name>
  ```
- **List All Releases**
  ```bash
  helm list
  ```
- **Search for Charts**
  ```bash
  helm search repo <chart-name>
  ```
- **Show Values**
  ```bash
  helm show values <chart-name>
  ```
- **Rollback a Release**
  ```bash
  helm rollback <release-name> <revision>
  ```

#### **Helm Chart Management**

- **Create a New Chart**
  ```bash
  helm create <chart-name>
  ```
- **Package a Chart**
  ```bash
  helm package <chart-directory>
  ```
- **Lint a Chart**
  ```bash
  helm lint <chart-directory>
  ```

#### **Helm Repo Management**

- **Add a Repository**
  ```bash
  helm repo add <repo-name> <repo-url>
  ```
- **Update Repositories**
  ```bash
  helm repo update
  ```
- **List Repositories**
  ```bash
  helm repo list
  ```
