- APM
- logger (winston / pino)

- Product anlytics
- Posthog

- Testing
- DAST -> Zap Baseline
- SCA -> OWASP, dependency-check
- SAST -> SonarQube
- SAT -> ESLint, Prettier, Typescript , type-feast

- Truffle hog action + pre push hook

- Dependency management
- renovate.json
- dependabot

- tspaths (custom paths)
- ex: import {detectOS} from "@/utils"

- typings folder
- loki (visual regression testing)
- UT's via TDD
- HTTP mocking via MSW
- Axios wrapper ie., HttpClient
- App Credentails ie., env
- infiscial / AWS secrets

- Reusable Yup validation schema's
- Charts
- Dates
- i18n
- assets
- jest -previewer
- Testing using matrix strategy
- Have ideal status badges on the README

---

- cypess
  - stubs
  - spies
  - dummies
  - fixtures
  - commands vs query

# Types of features in an app

- default features
- feat is visible only on enabling
- available for some duration
- visible based on logged in user role

# Types of features access

- complete access to all
- default access to features
- limited access to features based on some attributes like,
  - duration `15 days trail phase`
  - user plan `pro version`

---

# JS tooling

- babel
- eslint
- webpack
  - Externalize
  - Tree shaking
  - chunking
  - cache bursting
  - code splitting
  - minifying
  - uglifying
- hoc (higher order components)

# ESLint

- plugins
- parser
- parserOptions
- extends
- rules
- settings
- overrides
- env

# Lint and format

```json
lint: "preitter --check"
format: "preitter --write"
```

---
