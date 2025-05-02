## Current Stage

- Nothing

## Propsed Stage

- Testing phase, integrate the feature branch only

  - All the test cases pass
  - Code coverage is greater that 80%
  - Publish/Host the code coverage report on some platform (Github pages / code coveralls)

- Test the app code at CI phase using [Matrix Strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)

Example:

```bash
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12, 14]
    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.version }}
```

- Static analysis testing phase
  - Sonarcube / CodeQL `free from Github`
- Auto generate changelog, if the build was successfull
  - Changesets
- Analise our project to maintain upto date, package dependencies with tools like
  - dependabot
- Have issue templates for our project to understand what was the changes associated with the PR

```
    .github/
      workflows/
      ISSUE_TEMPLATES/
        pr-details.md
```

- Concept of `CODEOWNERS` for scoping user access at repo level
- Have a linter for commit messages, configured with pre-commit githook
- Configure a pre-push hook, to run test cases before its pushed to the remote branch
- Enable DAST with `Zap Baseline github action`
- Enable SCA with tools like `OWASP/dependecy-check`
- Have ideal status badges on the README to indicate the current status indicators of the project

  - Test Coverage
  - Build pass/fail

- Scan for sensitive information with `Truffle hog` ( available in 2 flavours)
  - When a PR raised to dev/feature branch
  - as pre push hook
