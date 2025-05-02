# MFE

### git commit standard in case of a monorepo

- syntax
  - type(scope): message_body (Jira Story-Ticketno)
    ex: feat(uikit): add toast component (Ticket-1954)

### Concerns raised during the Discussions on MFE

1. MFE setup with what components should Container MFE should hold
2. Different MFE's along with there bounded context
   - MFE DataSphere
   - MFE Container, etc
3. How to use Monorepo tools like turborepo,
   - on how do we identify the git changes in a specifc MFE.
   - CI/CD,
   - linting, testing, ts-config etc
4. How CSS is shared accross the MFE's / CSS architecture
5. If we have figured out the above mentioned point, then how will the
   shared CSS effect our ability to move/migrate to different design-systems or css frameworks in the future
6. Identify the core functionalities that would be shared/exposed to other MFE's for consumption,
   - localstorage
   - urlparams ex. type=edit in the url bar shows <EditComponent/>
   - axios setup
7. Need to figure out how to handle,configure,setup Feature flags

### Store & Service Code

- In a Micro Frontend (MFE) architecture, where you have multiple independently deployable React applications, each with its own Redux store, you may encounter the need to share global data and common API service code across these MFEs.
- And also need to common global data and API service code from the external redux lib which will be used across all mfe
