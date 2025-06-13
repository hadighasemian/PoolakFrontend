import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    auth: {
        login: {
            login: boolean;
            token: string;
        };
        clientRole: any; // Define more specific type later
        user: any;       // Define more specific type later
    }
}

// Define the initial state using that type
const initialState: AuthState = {
    auth: {
        login: {
            login: false,
            token: '',
        },
        clientRole: {},
        user: {}
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action) => { // Payload should match AuthState['auth']
            state.auth = action.payload
        },
        setClientRole: (state, action) => { // Payload should match AuthState['auth']['clientRole']
            state.auth.clientRole = action.payload // Corrected path
        },
        setAuthUser: (state, action) => { // Payload should match AuthState['auth']['user']
            state.auth.user = action.payload
        },
    }
})

export const { setAuthState,setClientRole,setAuthUser } = authSlice.actions
export default authSlice.reducer
