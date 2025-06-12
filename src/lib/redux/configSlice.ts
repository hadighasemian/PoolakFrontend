import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    homeTab: 0,
  },
  reducers: {
    setHomeTab: (state, action) => {
      state.homeTab = action.payload
    },
  }
})

export const { setHomeTab } = configSlice.actions
export default configSlice.reducer