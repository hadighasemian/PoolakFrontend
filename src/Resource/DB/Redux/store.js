import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import configReducer from './configSlice'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const rootReducer = combineReducers({
    auth : authReducer,
    config : configReducer,
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