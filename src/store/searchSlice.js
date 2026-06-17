import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchQuery: ''
}

const searchSlice = createSlice({
    name: 'search', 
    initialState, 
    reducers: {
        setQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    } 
})

export const {setQuery} = searchSlice.actions
export default searchSlice.reducer
