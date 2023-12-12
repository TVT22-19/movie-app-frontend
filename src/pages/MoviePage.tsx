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
    IconButton
} from "@mui/material";
import { useAuth } from "../hooks/useAuth.tsx";
import SendIcon from '@mui/icons-material/Send';
import { useFetchMovieData, useFetchReviewsByMovieId, addReview } from "./movieAndSearchQueries.ts";
import MovieRating from "./MovieRating.tsx";
import { useState } from "react";

//TODO: display rating on reviews
//TODO: actual user id for sending reviews
//TODO: display username instead of user id
//TODO: fix image stretching issue


export default function MoviePage() {
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState<number | null>(0);

    const { isAuthorized } = useAuth()

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
        const ratingToSend = reviewRating ?? 0;
        console.log('Content:', reviewContent);
        console.log('Rating:', reviewRating);
        addReview(2, movieId, reviewContent, ratingToSend);
        //TODO: re-fetch reviews to display the one just added
    };

    return (
        <Stack spacing={2}>
            {movieInfo && movieInfo.title ? (
                <Card>
                    <Stack direction="row">
                        <img src={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`} alt="Movie Image" width="512px" />
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

                    {!reviewError ? (
                        reviewData?.map((review) => (
                            <Card key={review.id}>
                                <CardContent>
                                    <Stack direction="row">
                                        <Typography flexGrow={1} variant="h6">
                                            Review by User {review.user_id}
                                        </Typography>
                                        {review.rating !== null && <Rating readOnly value={review.rating} />}
                                    </Stack>
                                    <Typography variant="body2">{review.content}</Typography>
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
