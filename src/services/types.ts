export interface User {
    userId?: number,
    username: string,
    password?: string
    firstname?: string,
    lastname?: string,
    age?: number,
    registration_date?: string,
    avatarURL?: string
}

export interface Group {
    id: number,
    name: string
}

export interface AuthObject {
    message: string,
    user: User,
    token?: string
}

export interface ApiError {
    error: string
}

export interface Reviews {
    id: number,
    date: string,
    user_id: number,
    movie_id: number,
    content: string,
    rating: string
}