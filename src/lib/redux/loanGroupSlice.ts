import { createSlice } from '@reduxjs/toolkit'

interface LoanGroupState {
    loanGroup: any; // Define more specific type later
    updateFlag: number;
}

const initialState: LoanGroupState = {
    loanGroup: {},
    updateFlag:0,
}

export const loanGroupSlice = createSlice({
    name: 'loanGroup',
    initialState,
    reducers: {
        setLoanGroup: (state, action) => { // Payload should match LoanGroupState['loanGroup']
            state.loanGroup = action.payload
        },
        setUpdateFlag: (state) => {
            state.updateFlag++ ;
        },
    }
})

export const { setLoanGroup,setUpdateFlag} = loanGroupSlice.actions
export default loanGroupSlice.reducer
