
import { GroupData, GroupUser, JoinRequestBody, Member, Post, UserRemovalBody } from "./types.ts";

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


export const removeMember = async (userRemovalBody: UserRemovalBody):  Promise<string>=> {
    const response = await fetch(`${hostUrl}/group/deletemember/${userRemovalBody.selectedUserId}/from/${userRemovalBody.groupId}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) throw new Error((await response.json()).message); 
    return await response.json() as string;
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

export const fetchGroupsByUser = async (userId: number):Promise <GroupUser[]> => {
    try {
      const response = await fetch(`${hostUrl}/group/groupsbyuser/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch groups user is part of');
      }
      const groupsData = await response.json();
  
  //to add group names
      const groupDetailsPromises = groupsData.map(async (group:GroupUser) => {
        const groupDetailsResponse = await fetch(`${hostUrl}/group/${group.group_id}`);
        if (!groupDetailsResponse.ok) {
          throw new Error(`Failed to fetch details for group ${group.group_id}`);
        }
        const groupDetails = await groupDetailsResponse.json();
        console.log(groupDetails);
        
        return { ...group, name: groupDetails.name };
      });
  
      const groupsWithDetails = await Promise.all(groupDetailsPromises);
     console.log("groupswithdetails:",groupsWithDetails);
      return groupsWithDetails as GroupUser[];

    } catch (error) {
      throw new Error(`Error fetching groups`);
    }
  };

  export const createJoinRequest = async ( joinRequestBody: JoinRequestBody): Promise <string> => {

    console.log (joinRequestBody);
   
        const response = await fetch(`${hostUrl}/grouprequest/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userid: joinRequestBody.userId, groupid: joinRequestBody.groupId})
        });
        

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json() as string;
    
}
  


