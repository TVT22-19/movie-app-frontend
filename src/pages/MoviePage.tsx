import { Navigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    Divider,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Rating,
    Stack,
    Typography,
    Box,
    IconButton,
    CardMedia,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    useTheme
} from "@mui/material";
import { useAuth } from "../hooks/useAuth.tsx";
import SendIcon from '@mui/icons-material/Send';
import { useFetchMovieData, useFetchReviewsByMovieId, addReview } from "./movieAndSearchQueries.ts";
import MovieRating from "./MovieRating.tsx";
import { useState } from "react";
import { Review } from "./types.ts";
import { User } from "../services/types.ts";

//TODO: re-fetch reviews to display the one just added
//TODO: sort the reviews chronologically upon fetch (currently sorting doesn't happen automatically - only when radio buttons change)

export default function MoviePage() {
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState<number | null>(0);
    const [sortOption, setSortOption] = useState<'chronological' | 'rating'>('chronological');
    const [sortedReviews, setSortedReviews] = useState<Review[] | null>([]);

    const { isAuthorized, getToken } = useAuth()
    let user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined;

    const movieId = Number(useParams().id)
    if (Number.isNaN(movieId)) return <Navigate to="/page-not-found" />

    const { data: movieInfo, error: infoError, isLoading: infoLoading } = useFetchMovieData(movieId);
    const { data: reviewData, error: reviewError, isLoading: reviewLoading } = useFetchReviewsByMovieId(movieId);

    if (infoLoading || reviewLoading) {
        return <div>Loading...</div>;
    }

    if (infoError) {
        return <div>Error loading movie data</div>;
    }

    const handleAddReview = async () => {

        try {
            const ratingToSend = reviewRating ?? 0;
            console.log('Content:', reviewContent);
            console.log('Rating:', reviewRating);
            if (user?.userId !== undefined) {
            addReview(user.userId, movieId, reviewContent, ratingToSend);
            setReviewContent('');
            setReviewRating(0);
            //refetch
            }else{
                console.log("User ID undefined")
            }

        } catch (error) {
            console.error("Error adding review", error);
        }

    };

    const handleSortChange = (newSortOption: 'chronological' | 'rating') => {

        console.log(newSortOption);
        if (reviewData) {
            if (newSortOption === 'chronological') {
                const reviewsCopy = [...reviewData];

                reviewsCopy.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                setSortedReviews(reviewsCopy);
            }
            else if (newSortOption == 'rating') {
                const reviewsCopy = [...reviewData];

                reviewsCopy.sort((a, b) => {
                    const ratingA = a.rating ?? 0;
                    const ratingB = b.rating ?? 0;
                    return ratingB - ratingA;
                });
                setSortedReviews(reviewsCopy);
            }
        }
    };


    const theme = useTheme();

    return (
        <Stack spacing={2}>
            {movieInfo && movieInfo.title ? (
                <Card>
                    <Stack direction="row">

                        <CardMedia
                            component="img"
                            alt="Movie poster image"
                            width="512"
                            image={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}
                            sx={{
                                maxWidth: '40%',
                                height: 'auto',
                            }}
                        />
                        <CardContent>
                            <Stack direction="row" spacing={2}>
                                <Stack>
                                    <Typography variant="h4">{movieInfo.title}</Typography>
                                    {movieInfo.release_date && (
                                        <Typography variant="h6">Year: {new Date(movieInfo.release_date).getFullYear()}</Typography>
                                    )}
                                    {movieInfo.vote_average !== undefined ? (
                                        <MovieRating voteAverage={movieInfo.vote_average} />
                                    ) : (
                                        <Typography variant="body2">No rating available</Typography>
                                    )}
                                    <Divider style={{ paddingBottom: 16 }} />
                                    <Typography variant="body1" style={{ paddingTop: 16 }}>
                                        {movieInfo.overview}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Stack>

                    <Box mt={4} />

                    {isAuthorized && (
                        <Card>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Add review</InputLabel>
                                <OutlinedInput
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Rating
                                                value={reviewRating}
                                                onChange={(event, newValue) => setReviewRating(newValue)}
                                            />
                                            <IconButton onClick={handleAddReview} edge="end">
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Review"
                                    value={reviewContent}
                                    onChange={(event) => setReviewContent(event.target.value)}
                                />
                            </FormControl>
                        </Card>
                    )}

                    <Box mt={2} />
                    <div>

                    {reviewData && reviewData.length > 0 ? (
                         <Card style={{padding:'16px'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sort Order</FormLabel>
                            <RadioGroup
                                row
                                aria-label="sort-order"
                                name="sort-order"
                                value={sortOption}
                                onChange={(e) => {
                                    const chosenValue = e.target.value as 'chronological' | 'rating';
                                    setSortOption(chosenValue);
                                    handleSortChange(chosenValue);
                                }}
                            >
                                <FormControlLabel value="chronological" control={<Radio />} label="Chronological" />
                                <FormControlLabel value="rating" control={<Radio />} label="By Rating" />
                            </RadioGroup>
                        </FormControl>
                    </Card>

                    ) : (
                        <Typography style={{padding:'16px'}}>No reviews</Typography>
                    )}
                    </div>

                    {!reviewError ? (
                        (sortedReviews && sortedReviews.length > 0 ? sortedReviews : reviewData)?.map((review) => (
                            <Card key={review.id}>
                                <CardContent>
                                    <Stack direction="row">
                                        <Typography flexGrow={1} variant="h6">
                                            Review by {review.username}
                                        </Typography> 
                                        {review.rating !== null && <Rating readOnly value={review.rating} />}
                                    </Stack>
                                    <Typography variant="body2">{review.content}</Typography>
                                    <Typography style={{ color: theme.palette.text.secondary }}>
                                            <small>Review submitted on: {new Date(review.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} </small>
                                        </Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="h6">Error loading reviews</Typography>
                    )}
                </Card>
            ) : (
                <Typography variant="h6">No movie found</Typography>
            )}
        </Stack>
    )
};
