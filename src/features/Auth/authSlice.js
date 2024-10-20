import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    // loading: false,
    // userInfo: null,
    access_token: null,
    refresh_token: null,
    user_id: null,
    // error: null,
    // success: false,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            state.isAuthenticated = true
            state.user_id = action.payload.user_id
        },
        logout: (state) => {
            state.access_token = null
            state.refresh_token = null
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer