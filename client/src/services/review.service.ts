import {instance} from "../api/axios.api";


export const ReviewsService = {
    async addReview() {
        const {data} = await instance.post('review');
        return data
    }

};