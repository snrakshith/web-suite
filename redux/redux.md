# Redux

- ducks pattern

```js
 -> action.js
 -> actionTypes.js
 -> reducer.js
```

```js
-src -> store -> bug.js;
```

2 rules for applying the ducks patters

- reducers needs to be the default exports
- export individual action creators

- Redux-toolkit
  1 store

```ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import { dataSetSlice } from "../services/apiSlices/data-sets";
import { dashboardSlice } from "../services/apiSlices/dashboard";

import urlReducer from "./slices/urlSlice";

const persistConfig = {
  key: "root",
  storageSession,
};

// Combine the all reducer with a shared reducer
const rootReducer = combineReducers({
  selectedURL: urlReducer,
  [dataSetSlice.reducerPath]: dataSetSlice.reducer,
  [dashboardSlice.reducerPath]: dashboardSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      dataSetSlice?.middleware,
      dashboardSlice?.middleware,
    ]),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

## `Step 2` Create using `createAction`

```ts
// Action Type
const BUG_ADDED = "bug_added";
// Action Creator
export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description,
  },
});

import { createAction } from "@reduxjs/toolkit";
export const bugAdded = createAction("bugAdded");
```

## `Step 3` Create using `createReducer`

```ts
import { createReducer } from "@reduxjs/toolkit";
// Action Creator
export default const createReducer = (description) => ({
  // key:value
  // actions: functions(event => evenhandler)
  [bugCreated.type]:(bug,action)=>{
    bug.push({
        id:++lastId;
    });
  }
});
```

## You can automate the `actions & reducer` generation using `createSlice`

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUserSelectedURL = {
  selectedURL: string;
};

const initialState: IUserSelectedURL = {
  selectedURL: "",
};

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    changeSelectedURL: (state, action: PayloadAction<string>) => {
      state.selectedURL = action.payload;
    },
  },
});

export const { changeSelectedURL } = stateSlice.actions;

export default stateSlice.reducer;
```

### Calling apis

- Integrating Redux with React
  -1. react-redux library
  -2. use
  - useSelector => you can select a specific part/slice of a store
  - useDispatch => you can dispatch an action

```ts
const dispatch = useDispatch();
const bugs = useSelector((state) => state.entites.bugs.list);

useEffect(() => {
  dispatch(bugs());
}, []);
```

    -3. Selectors functions take a state object & return the slice of a state
    -4. In React class components, we have
        `mapStateToProps` & `mapDispatchToProps`

> export default connect(mapStateToProps,mapDispatchToProps)(Bugs)

# Middleware

```js
-src -> store -> middlewares/;
```

### Syntax

```ts
const logger = (store) => (next) => (action) => {
  // body
  next();
};

export default logger;
```

#### Example

```ts
// Step 1
const logger = (store) => (next) => (action) => {
  console.log("looging params");
  next();
};

export default logger;

// Step 2  store.ts file
export default function () {
  return configureStore({
    reducers,
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" })],
  });
}
```
