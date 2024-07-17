
export interface IUser {
    id: string
    name: string
    email: string
    image: string
    createdAt: string
    favorites: object[]
}

export interface IGoogleUser {
    id: string
    name: string
    email: string
    image: string
    password: string
}