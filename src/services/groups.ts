import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    ApiMessage,
    Group,
    GroupCreationBody,
    GroupData,
    GroupUser,
    JoinRequestBody,
    JoinRequests,
    Member,
    Post,
    UserRemovalBody
} from "./types.ts";
import {
    answerToJoinRequest,
    checkMembership,
    checkOwnership,
    createDiscussionPost,
    createGroup,
    createJoinRequest,
    fetchDiscussionPosts,
    fetchGroupInfo,
    fetchGroupsByUser,
    fetchMembers,
    getGroupInvites,
    getGroups,
    removeMember
} from "./movieApi.ts";

export const useGroups = () => useQuery<Group[], Error>({
    queryKey: ["groups"],
    queryFn: () => getGroups().then(data => data)
})

export const useGroupInvites = (userId: number | undefined, isAuthorized: boolean) => useQuery<JoinRequests[], Error>({
    queryKey: [`group_invites`],
    queryFn: () => getGroupInvites(userId!).then(data => data),
    enabled: (isAuthorized && !!userId)
})

export const useGroupCreate = () => {
    const queryClient = useQueryClient()
    return useMutation<ApiMessage, Error, GroupCreationBody>({
        mutationKey: ["createGroup"],
        mutationFn: (groupBody) => createGroup(groupBody).then(data => data),
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["fetchgroupsbyuser"]})
            return queryClient.invalidateQueries({queryKey: ["groups"]});
        }
    });
}

export const useAnswerToJoinRequest = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, { userId: number, groupId: number, choice: boolean }>({
        mutationKey: ["createGroup"],
        mutationFn: (group) => answerToJoinRequest(group.userId, group.groupId, group.choice).then(data => data),
        onSettled: () => queryClient.invalidateQueries({queryKey: ["group_invites"]})
    });
}

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


