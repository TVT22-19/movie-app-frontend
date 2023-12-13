import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <Stack spacing={2}>
            <Card sx={{ padding: 3 }}> 
                <Typography>
                    <h2> Welcome to Movie App! </h2>
                    
Movie App provides a simple and user-friendly space for movie enthusiasts. On the platform, you can search for movies, share and read reviews, create groups, and connect with friends. You can also personalize your profile to make your movie-watching experience unique. Movie App is a space for film lovers to explore, discuss, and enjoy the world of cinema.


                </Typography>
            </Card>
           
        </Stack>
    )
}