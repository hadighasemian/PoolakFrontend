import {combineReducers, configureStore} from '@reduxjs/toolkit'
import groupReducer from './groupSlice'
import authReducer from './authSlice'
import configReducer from './configSlice'
import loanReducer from './loanSlice'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const rootReducer = combineReducers({
    group : groupReducer,
    auth : authReducer,
    config : configReducer,
    loan : loanReducer,
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['auth','config']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer
})
const persistor = persistStore(store)
export { store, persistor };