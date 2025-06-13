import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer, { AuthState } from './authSlice'; // Assuming AuthState is exported from authSlice
import configReducer, { ConfigState } from './configSlice'; // Assuming ConfigState is exported
import loanGroupReducer, { LoanGroupState } from './loanGroupSlice'; // Assuming LoanGroupState is exported
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Define RootState based on combined reducers
export interface RootState {
    auth: AuthState;
    config: ConfigState;
    loanGroup: LoanGroupState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
    loanGroup: loanGroupReducer,
});

// Special HYDRATE reducer to handle state reconciliation between server and client
const masterReducer = (state: RootState | undefined, action: Action & {payload?: any}) => {
    if (action.type === HYDRATE) {
        // console.log("HYDRATE ACTION, payload:", action.payload);
        // Be careful here, HYDRATE can overwrite client state if not handled correctly
        // A common strategy is to merge, giving client state precedence for certain parts
        // For now, a simple merge, but this might need refinement based on app logic
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        // Example: if you want to preserve client-side auth state during HYDRATE
        // if (state?.auth) nextState.auth = state.auth;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

const makeStore = () => {
    const isServer = typeof window === 'undefined';

    if (isServer) {
        // If server-side, create store without persistence
        return configureStore({
            reducer: masterReducer as any, // Type assertion might be needed due to HYDRATE
            devTools: process.env.NODE_ENV !== 'production',
        });
    } else {
        // If client-side, create store with persistence
        const persistConfig = {
            key: 'root',
            storage,
            whitelist: ['auth', 'config', 'loanGroup'], // Slices to persist
        };
        const persistedReducer = persistReducer(persistConfig, masterReducer as any);

        const store = configureStore({
            reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                }),
            devTools: process.env.NODE_ENV !== 'production',
        });

        // Create a persistor for this store
        (store as any).__persistor = persistStore(store); // Attach persistor to store for easy access

        return store;
    }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: process.env.NODE_ENV === 'development',
});
