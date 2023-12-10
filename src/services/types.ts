export interface User {
    id?: number,
    username: string,
    password?: string
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