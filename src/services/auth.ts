import {useQuery} from "@tanstack/react-query";
import {AuthObject, User} from "./types.ts";
import {login} from "./movieApi.ts";

export const useLogin = (user: User | undefined) => useQuery<AuthObject, Error>({
    queryKey: ["login", user],
    queryFn: () => login(user!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})