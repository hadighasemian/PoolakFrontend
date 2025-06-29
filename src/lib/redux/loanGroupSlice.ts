import { createSlice } from '@reduxjs/toolkit'

export const loanGroupSlice = createSlice({
  name: 'loanGroup',
  initialState: {
    loanGroup: {},
    updateFlag: 0,
  },
  reducers: {
    setLoanGroup: (state, action) => {
      state.loanGroup = action.payload
    },
    setUpdateFlag: (state) => {
      state.updateFlag++
    },
  }
})

export const { setLoanGroup, setUpdateFlag } = loanGroupSlice.actions
export default loanGroupSlice.reducer