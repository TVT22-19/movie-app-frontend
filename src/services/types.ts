export interface User {
    id?: number,
    userId?: number, //the jwt token contained the user id named as "userId", i don't know if "id" is a mistake or if it's used somewhere else 
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