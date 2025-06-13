import { createSlice } from '@reduxjs/toolkit'

interface ConfigState {
    homeTab: number;
}

const initialState: ConfigState = {
    homeTab: 0,
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setHomeTab: (state, action) => { // Payload should be number
            state.homeTab = action.payload
        },
    }
})

export const { setHomeTab } = configSlice.actions
export default configSlice.reducer
