import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups:
            [{
                id:1,
                title:'روش سلام کردن'
            }],
        group:
            {
                id:1,
            },

    },
    reducers: {
        add: (state, action) => {
            // console.log(action.payload)
            state.groups = [...state.groups,action.payload]
        },
        updateGroups: (state, action) => {
            // console.log(action.payload)
            state.groups = action.payload
        },

        edit: (state, action) => {
            state.groups = [...state.groups.filter((group)=>group.id!=action.payload.id),{
                id:action.payload.id,
                title:action.payload.title,
            }]
        },

        deleteGroup: (state, action) => {
            // console.log(state.blogs.filter((blog)=>blog.id==action.payload))
            state.groups = state.groups.filter((group)=>group.id!=action.payload)
        },
    }
})
export const newId = (groups)=>{
    let i = Math.max(...groups.map(o => o.id))
    return Math.abs(i) === Infinity?1:(i+1)
}
export const createNew = (groups)=>{
    return{
        id:newId(groups),
        title:"",
        text:""
    }
}

// Action creators are generated for each case reducer function
export const { add,updateGroups, edit, deleteGroup } = groupSlice.actions

export default groupSlice.reducer