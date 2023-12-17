import { createSlice } from '@reduxjs/toolkit'

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [],
        selected: {},
    },
    reducers: {
        setLoans: (state, action) => {
            // console.log('authSlice',action.payload)
            state.loans = action.payload
        },
        setSelectedLoan: (state, action) => {
            // console.log('authSlice',action.payload)
            state.selected = action.payload
        },
    }
})


// Action creators are generated for each case reducer function
export const { setLoans,setSelectedLoan } = loanSlice.actions

export default loanSlice.reducer