# K8s

# 2 main things in K8s

- Control Plane / Master node
  - API Server
  - Scheduler
  - Control Manager
  - ETCD
    - key/value storage
    - also a cluster brain
- Worker node
  - kube-proxy
  - kubelet
  - Container Runtime

# Components

- Pod
- Service
- Ingress
- Deployment
- Statefulset
- Configmap & Secrets `are allways attached to Pod`
- Volume
- DeamonSet

<!-- Image -->

- Deployments
  - We mainly use them for stateless applications
  - help in load balancing the traffic
- StatefullSet

  - When we work with database based applications, we tend to prefer StatefullSet as it involues `read` & `write` operations
  - helps in load balancing the traffic
  - avoid data inconsistency because of replication

- Replication

  - can be easily managed by deployments

# Generall rule of thumb

- Generally kubernetes cluster would have,
  - 2 Master Nodes
  - 3 Workers Nodes
- 1 App per pod,
- Many pods inside a Node,
- Pods communicate with each other via Virtual network created by the K8s
- Pods are ephimerals (can die easily)
- Volume
  - local (hard drive)
  - remote (cloud)
- Generally statefull applications (DB) are manged outside a K8s cluster
- K8s administrator or admin/user need to manage the DB related activites like (Backup, restore, etc)

# Simple flow of deployment to k8s cluster

node-app => Dockerfile =>Kustomise or helm chart => Datree => ArgoCD + Kargo => k8s
