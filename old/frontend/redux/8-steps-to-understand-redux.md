# A simple 8 steps to understand Redux

- A single source of truth
- 3 building blocks
  - Actions(events)
    - A single JS object
  - Store
    - A plane JS object
  - Reducers(event handlers/processor)
- When user performs n action,ie., like (adding an item inside a cart)
  we created an action object & dispatched it.
- The store object has an dispatch method that takes an action & forwards that action to the reducer
- We do not directly work with the reducer!. The store is responsible for call the reducer.
- The reducer computes the new state & returns it.
- Next the store will set the state internally, & notify the UI components about the update
- These UI components will pullout the updated data & update themWselves
