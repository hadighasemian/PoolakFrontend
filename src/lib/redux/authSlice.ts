import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      login: {
        login: false,
        token: '',
      },
      clientRole: {},
      user: {}
    }
  },
  reducers: {
    setAuthState: (state, action) => {
      state.auth = action.payload
    },
    setClientRole: (state, action) => {
      state.clientRole = action.payload
    },
    setAuthUser: (state, action) => {
      state.auth.user = action.payload
    },
  }
})

export const { setAuthState, setClientRole, setAuthUser } = authSlice.actions
export default authSlice.reducer