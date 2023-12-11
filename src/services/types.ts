export interface User {
    id?: number,
    username: string,
    password?: string
    firstname?: string,
    lastname?: string,
    age?: number,
    registration_date?: string
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