import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            login: {
                login: false,
                token: '',
            },
            clientRole: {

            },
            user: {

            }
        }
    },
    reducers: {
        setAuthState: (state, action) => {
            state.auth = action.payload
        },
        setClientRole: (state, action) => {
            // console.log('action.payload',action.payload)
            state.clientRole = action.payload
            // state.auth.clientRole = action.payload
        },
        setAuthUser: (state, action) => {
            // console.log('action.payload',action.payload)
            state.auth.user = action.payload
        },

    }
})


// Action creators are generated for each case reducer function
export const { setAuthState,setClientRole,setAuthUser } = authSlice.actions

export default authSlice.reducer