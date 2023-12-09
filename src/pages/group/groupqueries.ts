import {useQuery} from "@tanstack/react-query";
import {GroupData, Member, Post} from "./types"
import {fetchGroupInfo, fetchMembers, fetchDiscussionPosts, createDiscussionPost, removeMember, checkMembership, checkOwnership} from "./groupAPI"

export const useFetchMembers = (groupId: number) => useQuery<Member[], Error>({
    queryKey: ["fetchmembers", groupId],
    queryFn: () => fetchMembers(groupId),
    
})

export const useFetchDiscussionPosts = (groupId: number) => useQuery< Post[], Error>({
    queryKey: ["fetchposts", groupId],
    queryFn: () => fetchDiscussionPosts(groupId),
    
})

export const useFetchGroupInfo = (groupId: number) => useQuery< GroupData, Error>({
    queryKey: ["fetchgroupinfo", groupId],
    queryFn: () => fetchGroupInfo(groupId),
    
})

export const useCreatePost = (title: string, content: string, groupID: number, userID: number) => useQuery<void , Error>({ /*void?? undefined? what to put here?*/
    queryKey: ["createpost", title, content, groupID, userID],
    queryFn: () => createDiscussionPost(title, content, groupID, userID),
    
})

export const useRemoveMember = (selectedUserId: number, groupId: number) => useQuery< void , Error>({
    queryKey: ["removemember", selectedUserId, groupId],
    queryFn: () => removeMember(selectedUserId, groupId),
    
})

export const useCheckMembership = (userId: number, groupId: number) => useQuery< void, Error>({
    queryKey: ["checkmembership", userId, groupId],
    queryFn: () => checkMembership(userId, groupId),
    
})
export const useCheckOwnership = (userId: number, groupId: number) => useQuery< void , Error>({
    queryKey: ["checkownership", userId, groupId],
    queryFn: () => checkOwnership(userId, groupId),
    
})

