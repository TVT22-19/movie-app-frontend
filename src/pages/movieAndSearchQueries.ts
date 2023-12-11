import { useQuery } from "@tanstack/react-query";
const hostUrl: string = "http://localhost:3001";
import { Movie, TVSeries } from "./types";

export const fetchMedia = async (query: string, isMovie: boolean) => {
    if (!query) {
        return [];
    }
    
    const mediaType = isMovie ? 'movie' : 'tv';
    const response = await fetch(`${hostUrl}/moviedb/search/${mediaType}/${query}`);
    
    if (response.status !== 200) throw new Error((await response.json()).message);
    
    const data = await response.json();
    return isMovie ? data.results : (data.results as TVSeries[]);
}

const fetchMovieData = async (id: number): Promise <Movie> => {
    const response = await fetch(`${hostUrl}/moviedb/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie data');
    }
    return response.json();
};

export const useFetchMovieData = (movieId: number) => useQuery< Movie, Error>({
    queryKey: ["fetchmoviedata", movieId],
    queryFn: () => fetchMovieData(movieId),

})