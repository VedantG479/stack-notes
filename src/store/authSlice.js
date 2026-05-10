import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false, 
    userId: null, 
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.userId = action.payload
        }, 
        logout: (state) => {
            state.isAuthenticated = false
            state.userId = null
        }
    } 
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
