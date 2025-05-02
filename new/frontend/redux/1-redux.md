# Topics in Redux

- What is Redux
- install redux
- what is rtkquery
- difference btw redux & @redux/toolkit
- terms in redux
- hooks in redux

Lets perform these tasks

- we will store data in redux store
- Retrive stored data from store
- update & delete existing data in store

- What are middlewares?
- How to perform async actions using redux ?

Tasks for RTKQuery

we will use a mock api, to

- GET
- POST
- PUT
- Delete

---

# Understand Redux in 8 simple steps:

- A single source of truth
- 3 building blocks
  - Actions(events)
    - A single JS object
  - Store
    - A plane JS object
  - Reducers(event handlers/processor)
- When user performs an action,ie., like (adding an item inside a cart)
  we created an action object & dispatched it.
- The store object has an dispatch method that takes an action & forwards that action to the reducer
- We do not directly work with the reducer!. The store is responsible for call the reducer.
- The reducer computes the new state & returns it.
- Next the store will set the state internally, & notify the UI components about the update
- These UI components will pullout the updated data & update themselves

---
