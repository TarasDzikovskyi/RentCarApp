export interface IUser {
    id: number,
    email: string,
    name: string,
    image: string,
    favorites: object[]
    token: string
}

export interface IUserData {
    email: string,
    password: string
}

export interface IRefreshUserData {
    email: string
}

export interface IResponseUser {
    email: string | undefined,
    name: string | undefined,
    password: string | undefined,
    createdAt: string | undefined,
    updatedAt: string | undefined,
    id: number | undefined,
    image: string | undefined

}

export interface IResponseUserData {
    token: string,
    user: IResponseUser
}

export interface ICar {
    id: number,
    make: string,
    model: string,
    class: string,
    drive: string,
    fuel_type: string,
    transmission: string,
    year: number,
    image: string,
    price: number,
    capacity: number,
    booking?: object[],
    review?: object[],
    createdAt: string,
    updatedAt: string
}

interface IReviewUser {
    id: number,
    name: string,
    image: string,
    createdAt: string
}


export interface IReview {
    id: number,
    review: string,
    rating: string,
    user: IReviewUser
}

export interface IBooking {
    id: number,
    start_date: number,
    end_date: number,
    start_city: string,
    end_city: string,
    car_id: number
}