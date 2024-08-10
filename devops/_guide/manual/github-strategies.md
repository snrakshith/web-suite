### Currently we follow Github Workflow

When ever we make changes in our local branch we push to the remote branch,

- And raise a PR from Feature to Develop branch, if its approved we merge it
- If the CI pipeline is successfull we get to merge the local changes to develop/(higher) branch

#### Case study:

- If we have a undiscovered bug in our Prod env. `We follow the 2 step process`
- we have to fix in our local push it then raise a pr to dev branch, once its merged there
- we have to merge dev branch to main branch then the bug is resolve in the prod env

### Ideal strategy, that we follow Gitflow Workflow

- In order for us to avoid these `zero day exploits` & speed up our patch delivery, We can follow alternative Branching Strategy like Gitflow

- Where we directly work with `hotfix branch`

![Gitflow](/pictures/githflow.jpeg)
