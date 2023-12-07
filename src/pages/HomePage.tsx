import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <Stack spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
                <Card>
                    <CardActionArea component={Link} to={`movie/${value}`}>
                        <CardContent>
                            <Typography variant="h4">{value}. Spider-man Across The JavaScript</Typography>
                            <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque
                                doloribus,
                                cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem
                                quibusdam.</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>)}
        </Stack>
    )
}