import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {ICar} from "../../types/types";


interface UserState {
    cars: ICar[] | null,
}

const initialState: UserState = {
    cars: null,
};

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        fetchAll: (state, action: PayloadAction<ICar>) => {
            state.cars = action.payload;
        },
    },
});

export const {fetchAll} = carsSlice.actions;

// export const getAllCars = (state: RootState) => state.cars;

export default carsSlice.reducer