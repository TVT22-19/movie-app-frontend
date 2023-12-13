import {Reviews} from "./types.ts";
import {useQuery} from "@tanstack/react-query";
import {getReviews} from "./movieApi.ts";

export const useReviews = (id: number) => useQuery<Reviews[], Error>({
    queryKey: [`user_${id}`, "reviews"],
    queryFn: () => getReviews(id).then(data => data)
})
