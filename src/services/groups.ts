import {useQuery} from "@tanstack/react-query";
import {Group} from "./types.ts";

export const useGroups = (isAuthorized: boolean) => useQuery<Group[], Error>({
    queryKey: [`groups`],
    queryFn: () => ([
        {
            id: 1,
            name: "My new group"
        },
        {
            id: 2,
            name: "My internal ford"
        },
        {
            id: 3,
            name: "D.D.D"
        }
    ] as Group[]),
    enabled: isAuthorized
})

export const useGroupInvites = (isAuthorized: boolean) => useQuery<Group[], Error>({
    queryKey: [`group_invites`],
    queryFn: () => ([
        {
            id: 4,
            name: "T.T.T"
        },
        {
            id: 5,
            name: "Mastermind"
        }
    ] as Group[]),
    enabled: isAuthorized
})
