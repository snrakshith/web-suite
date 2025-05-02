# Github Actions

# core concepts

- workflow
  - workflow is repo related
- jobs

  - a single workflow may containe many jobs
  - jobs can run in parallel or sequential
  - each job contains many steps

- steps
  - contains `commands` to execute

```
.github/
  -> workflows/
     -> ci.yaml
```

- Environments/Env
  - Usage example `${{env.MONGO_DB_USERNAME}}`
- Secrets

  - Usage example `${{secret.MONGO_DB_USERNAME}}`

- Secrets can be stored at 3 levels

  - org
  - general repo
  - environment

- Runners

  - can be `github's machines`
  - or self hosted runners ie., our machines

- Secrity

  - Permissions
  - Script Injections
  - 3rd party actions

- github expression syntax `${{}}`
- Building a custom actions
