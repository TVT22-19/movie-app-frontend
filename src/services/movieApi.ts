import {ApiError, AuthObject, User} from "./types.ts";

// TODO Add url address for remove server
const hostUrl: string = "..."

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