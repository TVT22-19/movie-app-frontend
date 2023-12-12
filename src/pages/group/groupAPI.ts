
import { GroupData, Member, Post } from "./types.ts";

const hostUrl: string = "http://localhost:3001"


export const fetchMembers = async (groupId: number): Promise <Member[]> => {

    const response = await fetch(`${hostUrl}/group/members/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);

    return await response.json() as Member[];
}


export const fetchDiscussionPosts = async (groupId: number): Promise <Post[]> => {

    const response = await fetch(`${hostUrl}/group-post/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);

    return await response.json() as Post[];
}

export const createDiscussionPost = async (title: string, content: string, groupID: number, userID: number) => {
    try {
        const response = await fetch(`${hostUrl}/group-post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, userID, groupID, content })
        });

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createDiscussionPost:', error);
        throw error;
    }
}


export const fetchGroupInfo = async (groupId: number): Promise <GroupData> => {

    const response = await fetch(`${hostUrl}/group/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json() as GroupData;
}


export const removeMember = async (selectedUserId: number, groupId: number)=> {
    const response = await fetch(`${hostUrl}/group/deletemember/${selectedUserId}/from/${groupId}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) throw new Error((await response.json()).message); 
    return await response.json();
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

