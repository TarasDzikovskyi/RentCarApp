import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {IUser} from "../../types/types";


interface UserState {
  user: IUser | null,
    isAuth: boolean,
}

const initialState: UserState = {
    user: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false
        },

    },
});

export const {login, logout } = userSlice.actions;

export default userSlice.reducer