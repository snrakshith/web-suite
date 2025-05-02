# K8s Topics

## Terms

    - Namespace
    - DeamonSets
    - ReplicaSets
    - ConfigMaps & Secrets
    - Deployments
    - Services

## Kubernetes Architecture

## Services

    - NodePort
    - ClusterIp
    - Loadbalancer
    - Headless

## Autoscaling

    - Horizontal Pod Autoscaler (HPA)
    - Vertical Pod Autoscaler   (VPA)
    - Cluster Autoscaler        (CA)

## Kubernetes Probes

    - readinessProbe
    - livenessProbe
    - startupProbe

## Advanced Scheduling

    - nodeName
    - nodeSelector
    - Affinity
    - Taints & Tolerations
    - Headless

## Resource Management

    - Requesting CPU & Memory
    - Limiting CPU & Memory
    - Quality of Service
    - LimitRange ( Setting min,max & default resources for pods in a namespce )
    - ResourceQuota ( Limiting resources in a namespce )

## RBAC

    - ServiceAccount

## Jobs & CronJobs

    - ServiceAccount

## create a k8s folder in the project root

- add these 6 files important

  - service.yaml
  - hpa.yaml
  - deployment.yaml
  - ingress.yaml (were you define routes)
  - configmap.yaml (optional)
  - namespace.yaml (optional)

- every menifest resource file has this standard pattern

  - apiVersion
  - kind
  - metadata
  - spec

- K8s config has 3 parts

  - metadata

    - information about the component that we are creating

  - specification (spec)

    - attributes of a spec are specfic to the kind of component that is created
      ex: deployment will have different attributes comapred to services
      based on the kind the spec properties would change

  - state ( but that is automatically generated & added by k8s )

    - the data for state is coming from ETCD

### Layer of abstraction

Deployment manages a -> ReplicaSet manages a -> Pod (pod is an abstraction of) -> container
-> Dockerfile -> app

### Deployment overivew

- spec

  - replicas:
  - selector:
  - template:

### Connecting different components together

- labels & selectors

  - metadata part contains labels
  - specification part contains selectors

### Different repos templates

- pkg -> reusable npm package
- devops -> helm chart via k8s
- svc -> dockerized node backend service
- infra -> terraform
