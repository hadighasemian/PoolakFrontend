import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            login: {
                login: false,
                token: '',
            },
            clientRole:[
            ],
            user:
                {
                    id: 1,
                    name: "هادی قاسمیان قطب آباد",
                    mobile: "09133926148",
                    created_at: "2023-06-15T14:40:58.000000Z",
                    updated_at: "2023-06-15T14:40:58.000000Z",
                    success: true,
                    messages: ""
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
        },
    }
})


// Action creators are generated for each case reducer function
export const { setAuthState,setClientRole } = authSlice.actions

export default authSlice.reducer