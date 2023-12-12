import {AuthObject, User} from "./types.ts";
import {useQuery} from "@tanstack/react-query";
import {getUser, updateUser} from "./movieApi.ts";

export const useUser = (id: number) => useQuery<User, Error>({
    queryKey: [`user_${id}`],
    queryFn: () => getUser(id).then(data => data)
})

export const useUpdateUser = (user: User | undefined) => useQuery<AuthObject, Error>({
    queryKey: [user, "update"],
    queryFn: () => updateUser(user!).then(data => data)
})