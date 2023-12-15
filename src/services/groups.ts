import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ApiMessage, Group, GroupCreationBody, JoinRequests} from "./types.ts";
import {answerToJoinRequest, createGroup, getGroupInvites, getGroups} from "./movieApi.ts";

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
        onSettled: () => queryClient.invalidateQueries({queryKey: ["groups"]})
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