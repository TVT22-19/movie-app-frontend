import { useQuery } from "@tanstack/react-query";
const hostUrl: string = "http://localhost:3001";
import { Movie, TVSeries, Review } from "./types";

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

//move these eventually
export const useFetchMovieData = (movieId: number) => useQuery< Movie, Error>({
    queryKey: ["fetchmoviedata", movieId],
    queryFn: () => fetchMovieData(movieId),

})

const fetchReviewsByMovieId = async (id: number): Promise <Review[]> => {
    const response = await fetch(`${hostUrl}/review/movieid/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie data');
    }
    return response.json();
};

export const useFetchReviewsByMovieId = (movieId: number) => useQuery< Review[], Error>({
    queryKey: ["fetchreviewsbymovieid", movieId],
    queryFn: () => fetchReviewsByMovieId(movieId),

})