import { useQuery } from "@tanstack/react-query";
import { Movie, TVSeries, Review } from "./types";

const hostUrl: string = "http://localhost:3001";

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
    const reviews = await response.json();

    const userIds = reviews.map((review: Review)=> review.user_id);

    // user information for each user ID
    const users = await Promise.all(
        userIds.map((userId: number) => fetch(`${hostUrl}/users/${userId}`).then(response => response.json()))
    );

    const reviewsWithUsernames = reviews.map((review: Review, index: number) => ({
        ...review,
        username: users[index].username, 
    }));

    return reviewsWithUsernames;
};


export const useFetchReviewsByMovieId = (movieId: number) => useQuery< Review[], Error>({
    queryKey: ["fetchreviewsbymovieid", movieId],
    queryFn: () => fetchReviewsByMovieId(movieId),

})


export const addReview = async (userID: number, movieID:number, content: string, rating: number) => {
    const response = await fetch(`${hostUrl}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID, movieID, content, rating}),
    });
  
    if (!response.ok) {
        throw new Error('Failed to add review');
    }
  
    return response.json();
  };