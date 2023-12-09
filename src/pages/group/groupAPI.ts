
import { GroupData, Member, Post } from "./types.ts";

//add hostUrl as variable here 
const hostUrl: string = "http://localhost:3001"

//Promises?
export const fetchMembers = async (groupId: number) => {

    const response = await fetch(`${hostUrl}/group/members/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);

    return await response.json();
}


export const fetchDiscussionPosts = async (groupId: number) => {

    const response = await fetch(`${hostUrl}/group-post/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);

    return await response.json();
}

export const createDiscussionPost = async (title: string, content: string, groupID: number, userID: number) => {

    const response = await fetch(`${hostUrl}/group-post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, userID, groupID, content })
    });

    if (response.status !== 201) throw new Error((await response.json()).message);

    return await response.json();
}


export const fetchGroupInfo = async (groupId: number) => {

    const response = await fetch(`${hostUrl}/group/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json();
}



export const removeMember = async (selectedUserId: number, groupId: number)=> {
    if (selectedUserId){

    const response = await fetch(`${hostUrl}/group/deletemember/${selectedUserId}/from/${groupId}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) throw new Error((await response.json()).message); 
    return await response.json();}
}

export const checkMembership = async (userId: number, groupId: number) => {

    const response = await fetch(`${hostUrl}/group/is-member/${userId}/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json();
}

export const checkOwnership = async (userId: number, groupId: number) => {

    const response = await fetch(`${hostUrl}/group/is-owner/${userId}/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json();
}

