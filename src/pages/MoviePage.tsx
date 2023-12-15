import {Navigate, useParams} from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Rating,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import {useAuth} from "../hooks/useAuth.tsx";
import SendIcon from '@mui/icons-material/Send';
import MovieRating from "./MovieRating.tsx";
import {useEffect, useState} from "react";
import {Review, User} from "../services/types.ts";
import {addReview, useFetchMovieData, useFetchReviewsByMovieId} from "../services/movieApi.ts";
import {useQueryClient} from "@tanstack/react-query";


export default function MoviePage() {
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState<number | null>(0);
    const [sortOption, setSortOption] = useState<'chronological' | 'rating'>('chronological');
    const [sortedReviews, setSortedReviews] = useState<Review[] | null>([]);

    const {isAuthorized, getToken} = useAuth()
    const user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined;

    const movieId = Number(useParams().id)

    const queryClient = useQueryClient()
    const theme = useTheme();

    const {data: movieInfo, error: infoError, isLoading: infoLoading} = useFetchMovieData(movieId);
    const {data: reviewData, error: reviewError, isLoading: reviewLoading} = useFetchReviewsByMovieId(movieId);

    useEffect(() => handleSortChange('chronological'), [reviewData]);

    useEffect(() => setSortOption('chronological'), []);

    if (Number.isNaN(movieId)) return <Navigate to="/page-not-found"/>

    const handleAddReview = async () => {
        try {
            const ratingToSend = reviewRating ?? 0;
            console.log('Content:', reviewContent);
            console.log('Rating:', reviewRating);
            if (user?.userId !== undefined) {
                await addReview(user.userId, movieId, reviewContent, ratingToSend);
                setReviewContent('');
                setReviewRating(0);
                await queryClient.invalidateQueries({queryKey: ["fetchreviewsbymovieid"]})
            } else console.log("User ID undefined")

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
            } else if (newSortOption == 'rating') {
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

    if (infoLoading || reviewLoading) return <div>Loading...</div>;

    if (infoError) return <div>Error loading movie data</div>;

    return (
        <Stack spacing={2}>
            {movieInfo && movieInfo.title !== undefined ? <Card>
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
                                {movieInfo.release_date && <Typography variant="h6">Year: {
                                    new Date(movieInfo.release_date).getFullYear()
                                }</Typography>}
                                {movieInfo.vote_average !== undefined ?
                                    <MovieRating voteAverage={movieInfo.vote_average}/> :
                                    <Typography variant="body2">No rating available</Typography>}
                                <Divider style={{paddingBottom: 16}}/>
                                <Typography variant="body1" style={{paddingTop: 16}}>
                                    {movieInfo.overview}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Stack>
                <Box mt={4}/>
                {isAuthorized && (
                    <Card>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Add review</InputLabel>
                            <OutlinedInput label="Review" value={reviewContent} endAdornment={
                                <InputAdornment position="end">
                                    <Rating value={reviewRating}
                                            onChange={(event, newValue) => setReviewRating(newValue)}/>
                                    <IconButton onClick={handleAddReview} edge="end">
                                        <SendIcon/>
                                    </IconButton>
                                </InputAdornment>
                            } onChange={(event) => setReviewContent(event.target.value)}/>
                        </FormControl>
                    </Card>
                )}
                <Box mt={2}/>
                <div>
                    {reviewData && reviewData.length > 0 ? <Card style={{padding: '16px'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sort Order</FormLabel>
                            <RadioGroup row aria-label="sort-order" name="sort-order" value={sortOption}
                                        onChange={(e) => {
                                            const chosenValue = e.target.value as 'chronological' | 'rating';
                                            setSortOption(chosenValue);
                                            handleSortChange(chosenValue);
                                        }}>
                                <FormControlLabel value="chronological" control={<Radio/>} label="Chronological"/>
                                <FormControlLabel value="rating" control={<Radio/>} label="By Rating"/>
                            </RadioGroup>
                        </FormControl>
                    </Card> : <Typography style={{padding: '16px'}}>No reviews</Typography>}
                </div>

                {!reviewError ? (sortedReviews && sortedReviews.length > 0 ? sortedReviews : reviewData)?.map((review) => (
                    <Card key={review.id}>
                        <CardContent>
                            <Stack direction="row">
                                <Typography flexGrow={1} variant="h6">
                                    Review by {review.username}
                                </Typography>
                                {review.rating !== null && <Rating readOnly value={review.rating}/>}
                            </Stack>
                            <Typography variant="body2">{review.content}</Typography>
                            <Typography style={{color: theme.palette.text.secondary}}>
                                <small>Review submitted
                                    on: {new Date(review.timestamp).toLocaleString(undefined, {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    })} </small>
                            </Typography>
                        </CardContent>
                    </Card>
                )) : <Typography variant="h6">Error loading reviews</Typography>}
            </Card> : <Typography variant="h6">No movie found</Typography>}
        </Stack>
    )
}
