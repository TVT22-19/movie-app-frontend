import React, { useEffect, useState } from 'react';
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
    Rating,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';

import { Movie, TVSeries } from './types';
import { fetchMedia } from './movieAndSearchQueries';
import { useNavigate } from 'react-router-dom';

//TODO: hide "clear rating" if rating is set to 0, make the clear rating and clear year buttons prettier

const hostUrl: string = "http://localhost:3001"


const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [year, setYear] = useState<number>(0);
    const [value, setValue] = React.useState<number | null>(0);
    const [isMovie, setIsMovie] = useState<boolean>(true); // default to searching for movies
    const [mediaResults, setMediaResults] = useState<(Movie | TVSeries)[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        setMediaResults(undefined);
    }, [isMovie]);



    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const data = await fetchMedia(searchQuery, isMovie);

            const filteredMediaByYear = year !== 0
                ? data.filter((media: Movie | TVSeries) => {
                    const releaseDate = isMovie ? (media as Movie).release_date : (media as TVSeries).first_air_date;
                    return new Date(releaseDate).getFullYear() === year;
                })
                : data;

            const filteredMedia = value !== null
                ? filteredMediaByYear.filter((media: Movie | TVSeries) => media.vote_average >= value * 2) // scaling to convert 5 stars to 0-10 scale
                : filteredMediaByYear;

            setMediaResults(filteredMedia);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearYear = () => {
        setYear(0);
    };

    const handleMovieClick = (movieId: number) => {
        if (isMovie==true){
        navigate(`/movie/${movieId}`);}
      };

    const theme = useTheme();

    return (
        <div>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                    Search Filters
                </Typography>
                <RadioGroup
                    row
                    aria-label="media-type"
                    name="media-type"
                    value={isMovie ? 'movie' : 'tv'}
                    onChange={(e) => setIsMovie(e.target.value === 'movie')}
                >
                    <FormControlLabel value="movie" control={<Radio />} label="Movies" />
                    <FormControlLabel value="tv" control={<Radio />} label="TV Series" />
                </RadioGroup>

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
                    {mediaResults?.map((media) => (
                        <Grid item key={media.id} xs={12}>
                            <div onClick={() => handleMovieClick(media.id)} style={{ cursor: isMovie ? 'pointer' : 'default' }}>
                                <Card sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        alt={isMovie ? (media as Movie).title : (media as TVSeries).name}
                                        width="140"
                                        image={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
                                        sx={{
                                            flex: '10%',
                                            maxWidth: '15%',
                                            height: 'auto',
                                        }}
                                    />
                                    <CardContent sx={{ flex: '90%' }}>
                                        <Typography variant="h6">
                                            {isMovie ? (media as Movie).title : (media as TVSeries).name}
                                        </Typography>
                                        <Typography variant="body2">
                                            Rating: {media.vote_average} / 10 |
                                            Year: {new Date(isMovie ? (media as Movie).release_date : (media as TVSeries).first_air_date).getFullYear()}
                                            <br />
                                            <br />
                                            {media.overview}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </div>
    );
};

export default SearchPage;