import { Rating, Typography } from '@mui/material';

interface MovieRatingProps {
  voteAverage: number | undefined;
}

const MovieRating: React.FC<MovieRatingProps> = ({ voteAverage }) => {
  if (voteAverage === undefined) {
    return <div>No rating available</div>;
  }

  const convertedVote = voteAverage / 2;

  return (
    <div>
      <Rating
        name="read-only"
        value={convertedVote}
        precision={0.1}
        readOnly
      />
      <Typography variant="body2" color="textSecondary">
        {voteAverage.toFixed(1)}/10
      </Typography>
    </div>
  );
};

export default MovieRating;