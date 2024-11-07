import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    isLoggedIn: boolean;
    userName: string | null; 
}

const initialState: AuthState = {
    isLoggedIn: false,
    userName: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer(state, action: PayloadAction<{ userName: string }>) {
            state.isLoggedIn = true;
            state.userName = action.payload.userName; 
        },
        logoutReducer(state) {
            state.isLoggedIn = false;
            state.userName = null; 
            localStorage.removeItem('token');
        },
    }
});


export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
