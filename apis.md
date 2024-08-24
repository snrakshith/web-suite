# Remember

## POST

- standard 1
  - check req fields & store
- standard 2
  - check which user is trying to create a resource
  - check for all req fields
  - check for fields types
  - check for duplication values in db
  - then store it

## Get

- standard 1
  - Pagination
- standard 2
  - check if the user is authorised to get the data. RBAC
  - Pagination
  - check for the filters via,
    - body
    - query-params

## Delete

- standard 1
  - Who is deleting / User authorized or not
  - check that specific record exists in db or not
  - then delete

```js
// @route GET api
// @desc  Get the list of all active posts
// @access Public/Private
```
