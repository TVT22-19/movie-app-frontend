import {Rating, Typography} from '@mui/material';
import {MovieRatingProps} from "./types.ts";

const MovieRating = (props: MovieRatingProps) => {
    if (props.voteAverage === undefined) {
        return <div>No rating available</div>;
    }

    const convertedVote = props.voteAverage / 2;

    return (
        <div>
            <Rating
                name="read-only"
                value={convertedVote}
                precision={0.1}
                readOnly
            />
            <Typography variant="body2" color="textSecondary">
                {props.voteAverage.toFixed(1)}/10
            </Typography>
        </div>
    );
};

export default MovieRating;