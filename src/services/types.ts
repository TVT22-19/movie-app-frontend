export interface User {
    id?: number,
    userId?: number, //the jwt token contained the user id named as "userId", i don't know if "id" is a mistake or if it's used somewhere else
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

export interface GroupCreationBody {
    owner: number,
    gname: string,
    gdesc: string,
    gavatar?: string
}

export interface ApiMessage {
    message: string
}

export interface Reviews {
    id: number,
    date: string,
    user_id: number,
    movie_id: number,
    content: string,
    rating: string
}

export interface JoinRequests {
    group_id: number,
    group_name: string
    requests: {
        user_id: number
        username: string
    }[]
}