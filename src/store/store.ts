import { AnyAction, combineReducers, Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import * as reducers from './slices';

const combinedReducer = combineReducers(reducers);

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/signout/fulfilled') {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

const isProd = (import.meta.env.VITE_API_BASE_URL as string) === 'prod';

/* Reference: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data */

const asyncCountMap = new Map<string, number>();

const _store = configureStore({
  reducer: rootReducer,
  devTools: !isProd,
  // @ts-expect-error don't know why this happen
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

const store = Object.assign(_store, { asyncCountMap });

export { store };

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
