import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
    CardMedia,
    Typography,
    useTheme,
    Rating
} from '@mui/material';


//will be moved
interface Movie {

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

const hostUrl: string = "http://localhost:3001"

const fetchMovies = async (query: string) => {
    if (!query) {
        return [];
    }
    const response = await fetch(`${hostUrl}/moviedb/search/movie/${query}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    const data = await response.json();
    return data.results;
}


const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [year, setYear] = useState<number>(0);
    const [value, setValue] = React.useState<number | null>(2);
    const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);


    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const data = await fetchMovies(searchQuery);
    
            // filter movies by year
            const filteredMoviesByYear = year !== 0
                ? data.filter((movie: Movie) => new Date(movie.release_date).getFullYear() === year)
                : data;
    
            // filter movies by minimum rating
            const filteredMovies = value !== null
                ? filteredMoviesByYear.filter((movie: Movie) => movie.vote_average >= value * 2) // scaling to convert 5 stars to 0-10 scale
                : filteredMoviesByYear;
    
            setMovies(filteredMovies);

        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearYear = () => {
        setYear(0);
    };


    const theme = useTheme();

    return (
        <div>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                    Search Filters
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Search Query"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <TextField
                            type="text"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            value={year !== 0 ? year : ''}
                            onChange={(e) => setYear(Number(e.target.value))}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />


                        {/*ugly, ignore that for now*/}
                        {year !== 0 && (

                            <Button
                                variant="outlined"

                                onClick={handleClearYear}
                            >
                                Clear Year
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography> Minimum rating: </Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        {value !== null && (
                            <Button
                                variant="outlined"
            
                                onClick={() => setValue(null)}
                            >
                                Clear Rating
                            </Button>)}

                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                    Search Results
                </Typography>
                <Grid container spacing={3}>

                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error loading movies</div>}
                    {movies?.map((movie) => (
                        <Grid item key={movie.id} xs={12}>
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    width="140"

                                    image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    sx={{    
                                        flex: '10%',
                                        maxWidth: '15%', //image scaling weirdness forced my hand, but maybe this works
                                        height: 'auto',
                                        
                                    }}
                                />
                                <CardContent sx={{ flex: '90%' }}>
                                    <Typography variant="h6">{movie.title}</Typography>
                                    <Typography variant="body2">
                                        Rating: {movie.vote_average} / 10 | Year: {new Date(movie.release_date).getFullYear()}
                                        <br />
                                        <br />

                                        {movie.overview}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </div>
    );
};

export default SearchPage;