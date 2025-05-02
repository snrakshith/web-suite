### Section 1

- Helm is a

  - package manager for k8s similar to npm for node
  - templating engine

- instead of recreating things from scratch we can use other peoples modules, which are probably more battle tested

---

### Section 2

- We will helm our node app,

  - For that we will understand the `project structure`, `charts folder`
  - it also contains all the necessary dependecies for our current chart, similar to `node_modules` in node apps

- `templates folder`

  - it contains all the neccassry files required to run the app like
    - `service.yaml`
    - `deployment.yaml`
    - `ingress.yaml`
    - `hpa.yaml`

- `.helmignore file`

  - contains in this file are generally ignored

- `Chart.yaml`

  - it will store the meta data/information of the helm chart

- `values.yaml`
  - it will store all the required information that needs to be passed to templates
