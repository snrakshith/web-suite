# kubectl Commands

#### **Basic kubectl Commands**

- **Get All Resources**
  ```bash
  kubectl get all
  ```
- **Get Pods**
  ```bash
  kubectl get pods
  ```
- **Get Services**
  ```bash
  kubectl get svc
  ```
- **Describe a Pod**
  ```bash
  kubectl describe pod <pod-name>
  ```
- **Delete a Pod**
  ```bash
  kubectl delete pod <pod-name>
  ```
- **Apply a Manifest File**
  ```bash
  kubectl apply -f <file.yaml>
  ```
- **Delete a Resource**
  ```bash
  kubectl delete -f <file.yaml>
  ```

#### **Advanced kubectl Commands**

- **Get Logs of a Pod**
  ```bash
  kubectl logs <pod-name>
  ```
- **Get Logs of a Container in a Pod**
  ```bash
  kubectl logs <pod-name> -c <container-name>
  ```
- **Exec into a Running Container**
  ```bash
  kubectl exec -it <pod-name> -- /bin/bash
  ```
- **Scale a Deployment**
  ```bash
  kubectl scale deployment <deployment-name> --replicas=<count>
  ```
- **Expose a Deployment as a Service**
  ```bash
  kubectl expose deployment <deployment-name> --type=<service-type> --port=<port>
  ```

#### **Namespace Management**

- **Get Namespaces**
  ```bash
  kubectl get namespaces
  ```
- **Create a Namespace**
  ```bash
  kubectl create namespace <namespace-name>
  ```
- **Delete a Namespace**
  ```bash
  kubectl delete namespace <namespace-name>
  ```

#### **Config and Context Management**

- **View Current Context**
  ```bash
  kubectl config current-context
  ```
- **Switch Context**
  ```bash
  kubectl config use-context <context-name>
  ```
- **View All Contexts**
  ```bash
  kubectl config get-contexts
  ```
