import {ApiError, AuthObject, User, Reviews} from "./types.ts";

// TODO Add url address for remove server
const hostUrl: string = "http://localhost:3001"

// Example request
export const getUser = async (id: number): Promise<User> => {
    const response = await fetch(`${hostUrl}/users/${id}`)

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as User
}

/*   AUTH   */
export const login = async (user: User): Promise<AuthObject> => {
    const response = await fetch(`${hostUrl}/auth/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)

    return await response.json() as AuthObject
}

export const register = async (user: User): Promise<AuthObject> => {
    const response = await fetch(`${hostUrl}/auth/registration`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiError).error)

    return await response.json() as AuthObject
}

export const getReviews = async (user_id: number): Promise<Reviews[]> => {
    const response = await fetch(`${hostUrl}/review/userid/${user_id}`)

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as Reviews[]
}