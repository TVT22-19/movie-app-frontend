import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {GroupData, GroupUser, JoinRequestBody, Member, Post, UserRemovalBody} from "./types"
import {
    checkMembership,
    checkOwnership,
    createDiscussionPost,
    createJoinRequest,
    fetchDiscussionPosts,
    fetchGroupInfo,
    fetchGroupsByUser,
    fetchMembers,
    removeMember
} from "./groupAPI"

export const useFetchMembers = (groupId: number) => useQuery<Member[], Error>({
    queryKey: ["fetchmembers", groupId],
    queryFn: () => fetchMembers(groupId),

})

export const useFetchDiscussionPosts = (groupId: number) => useQuery<Post[], Error>({
    queryKey: ["fetchposts", groupId],
    queryFn: () => fetchDiscussionPosts(groupId),

})

export const useFetchGroupInfo = (groupId: number) => useQuery<GroupData, Error>({
    queryKey: ["fetchgroupinfo", groupId],
    queryFn: () => fetchGroupInfo(groupId),

})

export const useCreatePost = (title: string, content: string, groupID: number, userID: number) => useQuery<void, Error>({ /*void?? undefined? what to put here?*/
    queryKey: ["createpost", title, content, groupID, userID],
    queryFn: () => createDiscussionPost(title, content, groupID, userID),
})


export const useRemoveMember = () => {
    const queryClient = useQueryClient()
    return useMutation<string, Error, UserRemovalBody>({
        mutationKey: ['removemember'],
        mutationFn: (userRemovalBody: UserRemovalBody) => removeMember(userRemovalBody).then(data => data),
        onSettled: () => {
            return queryClient.invalidateQueries({queryKey: [`fetchmembers`]})
        }
    })
}

export const useCreateJoinRequest = () => {
    return useMutation<string, Error, JoinRequestBody>({
        mutationKey: ['addjoinrequest'],
        mutationFn: (joinRequestBody: JoinRequestBody) => createJoinRequest(joinRequestBody).then(data => data),
    })
}

export const useCheckMembership = (userId: number, groupId: number) => useQuery<void, Error>({
    queryKey: ["checkmembership", userId, groupId],
    queryFn: () => checkMembership(userId, groupId),

})
export const useCheckOwnership = (userId: number, groupId: number) => useQuery<void, Error>({
    queryKey: ["checkownership", userId, groupId],
    queryFn: () => checkOwnership(userId, groupId),

})
export const useFetchGroupsByUser = (userId: number | undefined) => useQuery<GroupUser[], Error>({
    queryKey: ["fetchgroupsbyuser", userId],
    queryFn: () => fetchGroupsByUser(userId!),
    enabled: !!userId
})


