import React, { useState } from 'react';
import {
    AppBar,
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

interface Movie {
    id: number;
    title: string;
    rating: number;
    year: number;
    imageUrl: string;
}

const dummyMovies: Movie[] = [
    {
        id: 1,
        title: 'Movie 1',
        rating: 4.5,
        year: 2022,
        imageUrl: 'https://static.wikia.nocookie.net/fanongarfield/images/9/9f/GarfieldCharacter.jpg',
    },
    {
        id: 2,
        title: 'Movie 2',
        rating: 3.8,
        year: 2020,
        imageUrl: 'https://static.wikia.nocookie.net/fanongarfield/images/9/9f/GarfieldCharacter.jpg', 
    },

];

const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [minYear, setMinYear] = useState<number>(0);
    const [movies, setMovies] = useState<Movie[]>(dummyMovies);
    const [value, setValue] = React.useState<number | null>(2);

    const handleSearch = () => {
   
        const searchResults = dummyMovies;
        //

        setMovies(searchResults);
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
                            type="number"
                            label="Min Year"
                            variant="outlined"
                            fullWidth
                            value={minYear}
                            onChange={(e) => setMinYear(Number(e.target.value))}
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
                    {movies.map((movie) => (
                        <Grid item key={movie.id} xs={12}>
                            <Card sx={{display: 'flex'}}>
                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    width="140"
                                   
                                    image={movie.imageUrl}
                                    sx={{ flex: '10%' }}
                                />
                                <CardContent sx={{ flex: '90%' }}>
                                    <Typography variant="h6">{movie.title}</Typography>
                                    <Typography variant="body2">
                                        Rating: {movie.rating} / 5 | Year: {movie.year}
                                        <br /> 
                                        <br /> 
                                
                                        Lorem ipsum
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