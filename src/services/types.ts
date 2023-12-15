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
    rating: number,
    movie_name: string
}

export interface JoinRequests {
    group_id: number,
    group_name: string
    requests: {
        user_id: number
        username: string
    }[]
}

export interface GroupData {
    name: string;
    description: string;
    avatar_url: string;
}

export interface Member {
    id: number;
    username: string;
    avatar: string;
}

export interface GroupUser {
    user_id: number;
    group_id: number;
    name: string;
}

export interface Post {
    user_id: number;
    title: string;
    content: string;
    timestamp: Date;
    username: string;
}

export interface UserRemovalBody {
    selectedUserId: number,
    groupId: number,
}

export interface JoinRequestBody {
    userId: number,
    groupId: number,
}

export interface Movie {

    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TVSeries extends Movie {
    origin_country: string[];
    first_air_date: string;
    name: string;
}

export interface Review {
    id: number;
    timestamp: string;
    user_id: number;
    movie_id: number;
    content: string;
    rating: number | null;
    username: string | null;
}
