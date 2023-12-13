import {Card, CardContent, Stack, Typography} from "@mui/material";

export default function HomePage() {
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h4"> Welcome to Movie App!</Typography>
                    <Typography>
                        Movie App provides a simple and user-friendly space for movie enthusiasts. On the platform, you
                        can
                        search for movies, share and read reviews, create groups, and connect with friends. You can also
                        personalize your profile to make your movie-watching experience unique. Movie App is a space for
                        film lovers to explore, discuss, and enjoy the world of cinema.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}