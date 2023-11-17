import {Avatar, Card, CardContent, Divider, IconButton, Stack, Typography} from "@mui/material";
import {Navigate, useParams} from "react-router-dom";
import {Delete, Edit,} from "@mui/icons-material";

export default function ProfilePage() {

    const profileId = Number(useParams().id)
    if (Number.isNaN(profileId)) return <Navigate to="/page-not-found"/>

    return (
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <Stack spacing={2} direction="row">
                        <Avatar sx={{
                            fontSize: 36,
                            width: 100,
                            height: 100
                        }}>RN</Avatar>
                        <Stack alignSelf="center" flexGrow={1}>
                            <Typography>Username (Real Name)</Typography>
                            <Typography>Age: 19</Typography>
                            <Typography>Registered: {new Date().toLocaleDateString()}</Typography>
                        </Stack>
                        <Stack>
                            <IconButton>
                                <Edit/>
                            </IconButton>
                            <IconButton>
                                <Delete color="error"/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <Divider/>
            <Typography variant="h4" textAlign="center">Reviews</Typography>
            {[1, 2, 3].map(() =>
                <Card>
                    <CardContent>
                        Aut fugiat exercitationem vel non dolorum placeat sit nihil. Quaerat et et eos placeat placeat.
                        Eaque voluptates nemo iste perspiciatis ullam est et debitis. Dolore cumque et sit labore
                        necessitatibus corporis dolores praesentium. Cumque maxime quo iste quis dignissimos et sit
                        doloremque.
                    </CardContent>
                </Card>
            )}
        </Stack>
    )
}