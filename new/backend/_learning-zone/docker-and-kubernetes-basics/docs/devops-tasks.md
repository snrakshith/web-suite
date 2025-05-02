# Devops Tasks

`CI`

1. Auto removal of stale docker images from ECR
2. Reduce docker image size with MultiStage Image builds

---

`CD`

1. Kargo for Release Orcastration
2. Karpenter for Autoscaling

---

## Updates related to the Devops Tasks assigned

`In case of CI`

### 1. Reduce docker image size with Multistage Image builds

Observations `ikure-devops-test-be` repo

- In this case we cannot be going with Multistage Image build because the code is written in JavaScript .
- Multistage Builds would make more sense, to those projects which are written in Typescript.
  So I created a sample node TS project in my personal github account here and ran a CI github action to deploy it to my personal aws ECR account.

The image size was close to `50mb. It seems like image size is directly proportional to the project dependency`.

### 2. Auto removal of stale docker images from ECR

We can achieve this functionality with ECR Lifecycle policies

And safely expire the old and unwanted images
