import {ApiError, ApiMessage, AuthObject, Group, GroupCreationBody, JoinRequests, Reviews, User} from "./types.ts";

// TODO Add url address for remove server
const hostUrl: string = "https://movie-app-backend-wjza.onrender.com"

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

export const updateUser = async (user: User): Promise<AuthObject> => {
    const response = await fetch(`${hostUrl}/users/update`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            username: user.username,
            password: user.password,
            age: user.age,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar_url: user.avatarURL,
            id: user.id
        })
    })

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as AuthObject
}

export const deleteUser = async (id: number): Promise<string> => {
    const response = await fetch(`${hostUrl}/users/delete/${id}`, {
        method: "DELETE"
    })

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as string
}

/*   GROUP   */
export const createGroup = async (groupBody: GroupCreationBody): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/group/add`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(groupBody)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiError).error)

    return await response.json() as ApiMessage
}

export const getGroups = async (): Promise<Group[]> => {
    const response = await fetch(`${hostUrl}/group/allgroups`)

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)

    return await response.json() as Group[]
};

export const getGroupInvites = async (userId: number): Promise<JoinRequests[]> => {
    const response = await fetch(`${hostUrl}/grouprequest/${userId}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)

    return await response.json() as JoinRequests[]
};


export const answerToJoinRequest = async (userId: number, groupId: number, choice: boolean): Promise<void> => {
    const response = await fetch(`${hostUrl}/grouprequest/${userId}/fromgroup/${groupId}/choice/${+choice}`, {
        method: "DELETE"
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)
}
