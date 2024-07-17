import {instance} from "../api/axios.api";
import {ICar} from "../types/types";


export const CarsService = {
    async getAllCars(): Promise<ICar[] | undefined> {
        const {data} = await instance.get<ICar[]>('car');
        return data
    },

    async getCarById(id): Promise<ICar | undefined> {
        const {data} = await instance.get<ICar[]>(`car/${id}`);
        return data
    }

};