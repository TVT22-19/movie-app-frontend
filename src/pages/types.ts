export interface Movie {

    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

}
export interface TVSeries extends Movie {
    origin_country: string[];
    first_air_date: string;
    name: string;
}

export interface Review {
    id: number;
    timestamp: string | null; 
    user_id: number;
    movie_id: number;
    content: string;
    rating: number | null; 
    username: string | null; 
}
