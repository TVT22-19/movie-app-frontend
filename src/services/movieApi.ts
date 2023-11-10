import {User} from "./types.ts";

// TODO Add url address for remove server
const hostUrl: string = "..."

// Example request
export const getUser = async (id: number): Promise<User> => {
    const response = await fetch(`${hostUrl}/users/${id}`)

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as User
}