import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { beansApi } from "./services/beansApi"
import { factsApi } from "./services/factsApi"
import { recipesApi } from "./services/recipesApi"
import { comboApi } from "./services/comboApi"

const rootReducer = combineReducers({
  [beansApi.reducerPath]: beansApi.reducer,
  [factsApi.reducerPath]: factsApi.reducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
  [comboApi.reducerPath]: comboApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        beansApi.middleware,
        factsApi.middleware,
        recipesApi.middleware,
        comboApi.middleware,
      ),
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
