import {useQuery} from "@tanstack/react-query";
import {AuthObject, User} from "./types.ts";
import {login, register} from "./movieApi.ts";

export const useLogin = (user: User | undefined) => useQuery<AuthObject, Error>({
    queryKey: ["login", user],
    queryFn: () => login(user!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})

export const useRegistration = (user: User | undefined) => useQuery<AuthObject, Error>({
    queryKey: ["registration", user],
    queryFn: () => register(user!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})