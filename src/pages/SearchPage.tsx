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
import { useQuery } from '@tanstack/react-query';

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
    const response = await fetch(`${hostUrl}/moviedb/search/${query}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    const data = await response.json();
    return data.results;
}



const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [year, setYear] = useState<number>(0);
    const [value, setValue] = React.useState<number | null>(2);
    const [timeToSearch, setTimeToSearch] = useState<boolean>(false);

    const useFetchMovies = (query: string) => useQuery<Movie[] | undefined, Error>({
        queryKey: ["fetchmovies", query],
        queryFn: () => fetchMovies(query),
        enabled: timeToSearch,
    });

    const { data: movies, isLoading, isError } = useFetchMovies(searchQuery);


    //add actual logic for when the search is performed

    const handleSearch = () => {

        setTimeToSearch(true);
        

    };

    React.useEffect(() => {
        if (movies) {
            setTimeToSearch(false);
        }
    }, [timeToSearch]);

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
                            type="number"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                        />
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
                        <Card sx={{display: 'flex'}}>
                            <CardMedia
                                component="img"
                                alt={movie.title}
                                width="140"
                               
                                image={movie.poster_path}
                                sx={{ flex: '10%' }}
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