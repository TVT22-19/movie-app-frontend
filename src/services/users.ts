import {AuthObject, User} from "./types.ts";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getUser, updateUser, deleteUser} from "./movieApi.ts";

export const useUser = (id: number) => useQuery<User, Error>({
    queryKey: [`user_${id}`],
    queryFn: () => getUser(id).then(data => data)
})

export const useUpdateUser = (user: User | undefined) => useQuery<AuthObject, Error>({
    queryKey: [user, "update"],
    queryFn: () => updateUser(user!).then(data => data)
})

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation<string, Error, number>({
        mutationFn: (userId) => deleteUser(userId).then(data => data),
        onSettled: (userId) => {
            return queryClient.invalidateQueries({queryKey: [`user_${userId}`]})
        }
    })
}