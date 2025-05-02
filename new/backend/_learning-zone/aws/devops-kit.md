# 45 minutes Before DevOps Interview

## AWS Questions

### What is AMI?

AMI is an Amazon machine image mainly contains operating system and configuration files which is mainly used to deploy multi virtual machines, regardless of any AWS region

### What is EC2 instance , and what are the types?

EC2 is a virtual machine that represents your physical machine for you to deploy an application
General purpose, compute optimised, memory, optimised, accelerated, compute instance, storage optimisation, instance

### Different types of storage ?

A elastic block storage, instant storage, both comes under block storage itself only

File storage : elastic file system and then AWS FSx
Elastic file system is mainly used for Linux operating system. Aws fSx is mainly useful Windows operating system.

Object Storage -S3, glacier.

Challenges with instant storage-it’s a temporary storage data will be lost if you stop and start the instance
Fixed size and type
Only available with the selected Instance types
Cannot detach and attach to other virtual machines
Advantage of EBS-permanent or persistent storage
Can be increased to 16 TB
available in different types, like SSD and HDD
EBS is available to all servers
Can be detached attached to others

### What are the different types of load balances?

Application load balancer works on HTTP and HTTPS protocol and network load balancer works on TCP and UDP protocol. Even application load balancer works on TCP protocol, but application load balancer doesn’t support UDP.
Because UDP is very efficient protocol when we are using streaming application or online meetings or any sort of streaming things, it is very useful. This is not supported by application load balancer. This is the major difference.

The major disadvantage with the network load balance is HTTP to https direction is not possible and also web application file was not supported.

### What are the different types of auto skilling groups we do have?

vertical scaling -increasing resource of existing servers, example T2 micro 2 T2 large needs to stop and start if we have multiple servers and we want to change the size of the instance it is not possible so we choose horizontal scaling example DB servers, file, servers, APP servers for this server, vertical scaling is best suited

Horizontal scaling-it will automatically create servers while the load is increasing

### What are the different types of route 53 routing policies we do have??

latency -latency means it will take the nearest data centre. To avoid the latency.

Failover -if one server goes down, the secondary server will take over

Weighted -example, there are a lot of uses in India due to large scale users. All the heads are going to US using latency to avoid such things we need to load balancing that is waited.

Geo location -Jio location will strictly follow the band rules, Indian New Zealand should go to India only and US region. User should go to US only.

Multivalues -we can give multiple server IP in multi values, specifically, it takes any one of the IP.

### What is CDN ?

a large portion of all internet content is delivering through CNCN is nothing but content deliver network

Example, if you are in India and want to watch the same brand in USA store, we will experienced bit slow response to avoid such issues. CDN will store cache version of the US website content in multiple geographical locations across the world also called as point of presence.

### How do you clear cash memory in cloud front ?

go to cloud front under cloud front. We do have something called distributions under distributions. > invalidation enter /\* and then clear.

### What are the different types of databases we do have?

structure database-RDBMS MYSQL , Oracle MSSQLPostgress mariaDB Arora.

Structure database, AWS dynamo DB AWS document DB

In memory database, elastic cache, AWS redshift

### What is systems, Manager ?

Systems, Manager is mainly used to centrally, manage the global configuration settings by using parameter store.

### What is the difference between AWS cloud Trail and AWS Config?

yes, we can monitor all the API activities activities such as logging in from console or CL or any third-party application like Packer and Terraform, everything all events will be recorded by the cloud Trail

Cloud config-Cloud conflict, especially used to tracking the detail changes which is happening on your resources. For example, if we make a 3,4 changes in your resources, you have a separate plural event, but in cloud conflict, it will show you consolidated overview. ### What are the changes it’s been performed.

### What is elastic beanstalk?

elastic beans, stock is the service for deploying and scaling web application and service. Upload your code and elastic bet will automatically handle the deployment from load balance into health monitoring.

### What is blue green deployment?

we had an application which is currently running and that application had an new updates. So all the traffic will be hit to load balance, so we will direct the traffic to the already existing application. Once testing part is done. Then we will route the traffic to the newly deployed application.

## Git

### what are the types of branching strategies you do follow?

we are following future branching strategies, which are main and integration which are long live branches
Main always points to the production comments, and the total code is available in the integration branch
So whenever we want to work on Application code, we create branch from the integration we developed, and we check if the pipeline is running smooth or amount. Once it is good, we will raise the PR.
If the PR conditions that the code is working, then only we merge.
So once marking with the integration, if it’s good, then we will check with the rest of the teams like QA pre-product production
So once it is succeeded in the production master points to the committee, so we point the tip and tag as version 1.0
By doing this, whatever the conflict, I will get, I will sit with the developers, and I will do the necessary things.

### What is Git and why is it used?

Git is a tool for tracking changes in code. It helps developers work together and keep track of every change.

Explain the difference between Git and GitHub.
Git is the tool that tracks changes in code. GitHub is a website where you can store and share your code using Git.

### What is a repository in Git?

A repository is like a folder for your project. It contains all your project files and the history of changes made to those files.

### What does the git init command do?

git init creates a new Git repository. It sets up all the necessary files for Git to start tracking changes.

### What is a commit in Git?

A commit is a snapshot of your project. It records what the project looks like at a certain point in time.

### How do you check the status of your repository?

Use the git status command. It shows you the changes that have been made and not yet committed.

### What does git add do?

git add stages changes. It tells Git to include the changes in the next commit.

### What is the purpose of git clone?

git clone copies a repository from a remote server to your local machine.

### What does git pull do?

git pull updates your local repository with changes from a remote repository.

### What is a branch in Git?

A branch is like a separate line of development. It lets you work on new features without changing the main codebase.

---

## Terraform

### What is terraform and what are the advantages?

Terraformism is an infrastructure automation tool, which is mainly used to deploy/provision our cloud infrastructure.
The main advantages inform is automation dry checks, validation of code, with the help of state file or TF. We can deploy another infra.

### how to change a configuration file, which is already created using a terraform-

Terraform import

### What is the use case of Terraform statefile.tf And where you save it?

Terraform maintenance state file that map share current state of your infrastructure along with the configuration file
So state files are basically in local machine for the back ups or in the remote location. S3 with strategies with the help of dynamo DB table locking policy.

### let’s say you have lost your Terraform state file. What will you do?

basically, statefile will contain very critical information. So keeping such files under locking system is always the best practice. Imagine you have lost the file so performs don’t know that there is an existing environment because the state file has been deleted. So if we deploy again with the source file, there will be a drastic overlapping and we and we see cross pollinations. so the best option is to use share of import.

### What are the main features in terraform?

terraform can manage infrastructure in multiple cloud platforms. Terraform uses HashiCorp language which is user readable.

### What are the different types of terraform modules?

There are multiple modules, but I have knowledge on route modules, publish modules . route modules which consists of all resources defined in the TF file which is the main working directory. Example it contains main.Tf or variable.tf or any additional terraform config Files.

The route modules will be considered as main configuration for your entire infra project.

### have you know what is remote backend?

remote back in is a place where we store all our TF state files which can be shared to other developers of infrastructure

### What are terraform workspace?

it is allows us to manage separate file for each workspace.

---

## Docker

### What is Docker and why is it used?

Docker is a platform that allows you to package, distribute, and run applications in containers. It's used for creating consistent environments across development, testing, and production.

### What is a container?

A container is a lightweight, standalone, and executable package that includes everything needed to run a piece of software, including code, runtime, libraries, and dependencies.

### Explain the difference between a Docker image and a Docker container.

A Docker image is a read-only template that contains the application and its dependencies. A Docker container is a runnable instance of a Docker image.

### How do you create a Docker container?

You create a Docker container by running an image with the docker run command. For example, docker run -d -p 8080-80 nginx runs a container based on the nginx image in detached mode, mapping port 8080 on the host to port 80 in the container.

### What is Docker Hub?

Docker Hub is a cloud-based registry service that allows you to store and share Docker images publicly or privately. It's a repository of Docker images maintained by Docker.

### How do you list running Docker containers?

Use the docker ps command to list all running containers. Adding the -a flag (docker ps -a) lists all containers, including stopped ones.

### What is the purpose of a Dockerfile?

A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. It's used to build Docker images automatically.

### How do you stop and remove a Docker container?

Use the docker stop command followed by the container ID or name to stop a running container. Then, use docker rm followed by the container ID or name to remove a stopped container.

### Explain the concept of Docker volumes.

Docker volumes provide a way to persist data generated by and used by Docker containers. They are stored outside the Union File System and can be shared among containers.

### What are Docker networks and why are they used?

Docker networks allow containers to communicate with each other and with other non-containerized devices on the same network. They are used to facilitate communication and isolation between containers.

---

## Kubernetes Questions

### What is Kubernetes and why is it used?

Kubernetes is an open-source platform for automating the deployment, scaling, and management of containerized applications. It helps in managing containerized applications across multiple hosts.

### What is a container?

A container is a lightweight, executable package of software that includes everything needed to run a piece of software, including code, runtime, libraries, and dependencies.

### Explain the difference between Kubernetes and Docker.

Docker is a platform for building and running containers, while Kubernetes is a container orchestration platform that manages the deployment and scaling of containers.

### What are Pods in Kubernetes?

Pods are the smallest and simplest Kubernetes objects. They represent a single instance of a running process in the cluster, which may consist of one or more containers that share storage and network resources.

### How do you create a Pod in Kubernetes?

You create a Pod by defining a Pod manifest file in YAML format, which specifies the Pod's configuration, such as containers, volumes, and metadata. Then, you apply this manifest file using kubectl apply -f pod.yaml.

### What is a Deployment in Kubernetes?

A Deployment in Kubernetes manages a set of identical Pods, ensuring that the desired number of Pods is running and handling updates and rollbacks.

### How do you create a Deployment in Kubernetes?

You create a Deployment by defining a Deployment manifest file in YAML format, which specifies the desired state of the Deployment, including the number of replicas and the Pod template. You then apply this manifest file using kubectl apply -f deployment.yaml.

### What is a Service in Kubernetes?

A Service in Kubernetes is an abstraction that defines a logical set of Pods and a policy by which to access them. It provides a stable endpoint for connecting to the Pods.

### How do you expose a Deployment as a Service in Kubernetes?

You expose a Deployment by creating a Service manifest file in YAML format, which specifies the type of Service (e.g., ClusterIP, NodePort, LoadBalancer) and selects the Pods to expose. You apply this manifest file using kubectl apply -f service.yaml.

### What is the role of kubectl in Kubernetes?

kubectl is the command-line tool used to interact with Kubernetes clusters. It allows you to deploy and manage applications, inspect and manage cluster resources, and view logs and troubleshooting information.

### What is a Namespace in Kubernetes?

A Namespace in Kubernetes provides a way to divide cluster resources among multiple users or projects. It helps organize and isolate resources within a cluster.

### How do you scale a Deployment in Kubernetes?

You scale a Deployment by updating the replicas field in the Deployment manifest file to the desired number of replicas (e.g., kubectl scale deployment/myapp-deployment --replicas=3).

### What is a ConfigMap in Kubernetes?

A ConfigMap in Kubernetes is an API object used to store non-sensitive configuration data in key-value pairs. It can be used to decouple configuration from Pods and containers.

### How do you manage application logs in Kubernetes?

Application logs in Kubernetes can be accessed using kubectl logs command followed by the Pod name and optional container name. For example, kubectl logs mypod.

### What is a Node in Kubernetes?

A Node in Kubernetes is a worker machine in the cluster. It may be a physical machine or a virtual machine, and it runs Pods managed by the Kubernetes control plane.

### What are Labels and Selectors in Kubernetes?

Labels are key-value pairs attached to Kubernetes objects (e.g., Pods, Services) for identification and grouping. Selectors are used to filter and select objects based on labels.

### How does Kubernetes handle container restarts?

Kubernetes automatically restarts containers that fail or exit, based on the Pod's restartPolicy (default is Always). It ensures that the desired state of the Pod (defined in the Deployment or Pod manifest) is maintained

### What is a Persistent Volume (PV) in Kubernetes?

A Persistent Volume in Kubernetes is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using StorageClasses. It provides storage resources for Pods.

### How do you upgrade Kubernetes cluster components?

Kubernetes cluster components (e.g., API server, Controller Manager, Scheduler) can be upgraded by updating the Kubernetes version in a controlled manner, following the upgrade instructions provided by the Kubernetes documentation.

### What is the difference between a StatefulSet and a Deployment in Kubernetes?

A StatefulSet is used for stateful applications that require stable, unique network identifiers and persistent storage. It manages Pods that are not interchangeable, whereas a Deployment is used for stateless applications and manages interchangeable Pods.
