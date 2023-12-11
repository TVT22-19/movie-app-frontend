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
    Box
} from "@mui/material";
import { useAuth } from "../hooks/useAuth.tsx";
import { useQuery } from "@tanstack/react-query";
import { useFetchMovieData } from "./movieAndSearchQueries.ts";
import { Movie } from './types';
import MovieRating from "./MovieRating.tsx";

const hostUrl: string = "http://localhost:3001"



export default function MoviePage() {

    const { isAuthorized } = useAuth()

    const movieId = Number(useParams().id)
    if (Number.isNaN(movieId)) return <Navigate to="/page-not-found" />

    const { data: movieInfo, error: infoError, isLoading: infoLoading } = useFetchMovieData(movieId);

    if (infoLoading) {
        return <div>Loading...</div>;
    }

    if (infoError) {
        return <div>Error loading movie data</div>;
    }


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
                          <Rating />
                        </InputAdornment>
                      }
                      label="Comment"
                    />
                  </FormControl>
                </Card>
              )}
      
              {[1, 2, 3].map((value) => (
                <Card key={value}>
                  <CardContent>
                    <Stack direction="row">
                      <Typography flexGrow={1} variant="h6">
                        {value}. Spider-man Across The JavaScript
                      </Typography>
                      <Rating value={Math.random() * (5 - 1) + 1} />
                    </Stack>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                      inventore consectetur, neque doloribus.
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Card>
          ) : (
            <Typography variant="h6">No movie found</Typography>
          )}
        </Stack>
      )};
      