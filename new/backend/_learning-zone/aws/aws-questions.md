## I. Foundational AWS Concepts (1-10)

### What is AWS?

- Amazon Web Services is a comprehensive and broadly adopted cloud platform, offering a wide array of services including compute, storage, databases, analytics, machine learning, and more.

### What are the benefits of using AWS?

- Benefits include cost savings, scalability, increased agility, enhanced security, and global reach.

### What are the different types of cloud computing?

- There are three main types:
  - Infrastructure as a Service (IaaS)
  - Platform as a Service (PaaS)
  - Software as a Service (SaaS).

### What is the AWS Global Infrastructure?

- It’s composed of Regions and Availability Zones.
- Regions are geographical areas, and Availability Zones are distinct locations within a region.

### What is an Availability Zone?

- An Availability Zone is a distinct location within a region.
- Multiple AZs in a region provide fault tolerance.

### What is a Region?

- A Region is a geographical area containing one or more Availability Zones.

### What is the difference between a Region and an Availability Zone?

- A Region is a larger geographical area, while an Availability Zone is a specific location within a region. Regions are independent, while AZs within a region are interconnected.

### What is AWS IAM?

- AWS Identity and Access Management allows you to manage users, groups, and permissions for your AWS resources.

### What are AWS access keys?

- Access keys are long-term credentials used to programmatically access AWS services. They should be kept secure.

### What is an IAM role?

- An IAM role is an identity that you can assume.
- Roles are used to grant permissions to entities that need to access AWS resources, without needing to manage long-term credentials.

## II. Compute Services (11-20)

### What is Amazon EC2?

- Amazon Elastic Compute Cloud provides resizable compute capacity in the cloud. It’s essentially virtual servers.

### What are EC2 instance types?

- EC2 instances come in various types optimized for different workloads (e.g., compute-optimized, memory-optimized).

### What is an Amazon Machine Image (AMI)?

- An AMI is a template that contains the operating system, application server, and applications needed to launch your EC2 instance.

### What is Amazon S3?

- Amazon Simple Storage Service is object storage for storing and retrieving any amount of data at any time.

### What is the difference between EC2 and S3?

- EC2 provides virtual servers, while S3 provides object storage. EC2 is for compute, S3 is for storage.

### What is Amazon EBS?

- Amazon Elastic Block Store provides block storage volumes for use with EC2 instances.

### What is the difference between S3 and EBS?

- S3 is object storage, while EBS is block storage. EBS is attached directly to an EC2 instance, while S3 objects are accessed via APIs.

### What is Amazon Lambda?

- AWS Lambda lets you run code without provisioning or managing servers. It’s a serverless compute service.

### What are Containers?

- Containers are a way to package up an application and its dependencies, so that it can be run consistently across different environments.

### What is Amazon ECS?

- Amazon Elastic Container Service is a container orchestration service that makes it easy to run, stop, and manage Docker containers.

---

## III. Storage and Databases (21-30)

### What are the different S3 storage classes?

- S3 offers various storage classes (e.g., Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier) for different access patterns and cost requirements.

### What is Amazon RDS?

- Amazon Relational Database Service makes it easy to set up, operate, and scale a relational database in the cloud.

### What are the different types of databases offered by RDS?

- RDS supports various database engines like MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB.

### What is Amazon DynamoDB?

- Amazon DynamoDB is a NoSQL database service.

### What is the difference between RDS and DynamoDB?

- RDS is for relational databases, while DynamoDB is for NoSQL databases. RDS uses structured data, while DynamoDB uses key-value pairs and documents.

### What is Amazon Redshift?

- Amazon Redshift is a data warehouse service.

### What is Amazon Aurora?

- Amazon Aurora is a MySQL and PostgreSQL-compatible relational database with improved performance and availability.

### What is Amazon ElastiCache?

- Amazon ElastiCache is a caching service that improves the performance of web applications by storing frequently accessed data in memory.

### What are the benefits of using ElastiCache?

- Improved performance, reduced database load, and enhanced user experience.

### What is Amazon Glacier?

- Amazon Glacier is a low-cost archive storage service.

---

## IV. Networking and Security (31-40)

### What is Amazon VPC?

- Amazon Virtual Private Cloud lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

### What are subnets?

- Subnets are subdivisions of a VPC.

### What is a route table?

- A route table contains a set of rules, called routes, that determine where network traffic is directed.

### What is an Internet Gateway?

- An Internet Gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.

### What is a Network ACL?

- A Network Access Control List is a firewall that controls traffic at the subnet level.

### What is a Security Group?

- A Security Group is a firewall that controls traffic at the instance level.

### What is the difference between a Network ACL and a Security Group?

- Network ACLs operate at the subnet level, while Security Groups operate at the instance level. Network ACLs are stateless, while Security Groups are stateful.

### What is AWS WAF?

- AWS Web Application Firewall helps protect your web applications from common web exploits.

### What is AWS Shield?

- AWS Shield provides protection against DDoS attacks.

### What is AWS KMS?

- AWS Key Management Service lets you create and manage encryption keys.

---

## V. Management and Monitoring (41-50)

### What is Amazon CloudWatch?

- Amazon CloudWatch is a monitoring service for AWS cloud resources and your applications.

### What are CloudWatch metrics?

- CloudWatch metrics are the fundamental data elements monitored by CloudWatch.

### What are CloudWatch alarms?

- CloudWatch alarms trigger actions based on metric thresholds.

### What is AWS CloudFormation?

- AWS CloudFormation lets you model and provision your AWS infrastructure as code.

### What is AWS Elastic Beanstalk?

- AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, and Go.

### What is AWS OpsWorks?

- AWS OpsWorks is a configuration management service that helps you automate the setup and operation of your applications.

### What is AWS CloudTrail?

- AWS CloudTrail logs API calls made to your AWS account.

### What is AWS Config?

- AWS Config provides a detailed inventory of your AWS resources and their configurations.

### What is AWS Cost Explorer?

- AWS Cost Explorer lets you visualize, understand, and manage your AWS costs over time.

### What is the AWS Well-Architected Framework?

- The AWS Well-Architected Framework provides a set of best practices for designing and building secure, reliable, performant, cost-effective, and operational systems in the AWS Cloud.
