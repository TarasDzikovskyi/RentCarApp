import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice";
import carsSlice from "./cars/carsSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        cars: carsSlice

    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch