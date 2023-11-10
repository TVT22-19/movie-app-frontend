import {User} from "./types.ts";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "./movieApi.ts";

export const useUser = (id: number) => useQuery<User, Error>({
    queryKey: [`user_${id}`],
    queryFn: () => getUser(id).then(data => data)
})
