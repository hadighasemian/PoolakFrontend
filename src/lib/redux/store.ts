import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import configReducer from './configSlice'
import loanGroupReducer from './loanGroupSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  loanGroup: loanGroupReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'config', 'loanGroup']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch