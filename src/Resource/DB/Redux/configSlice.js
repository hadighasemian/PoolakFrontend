import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        homeTab: 0,
    },
    reducers: {
        setHomeTab: (state, action) => {
            // console.log('authSlice',action.payload)
            state.homeTab = action.payload
        },
    }
})


// Action creators are generated for each case reducer function
export const { setHomeTab } = configSlice.actions

export default configSlice.reducer