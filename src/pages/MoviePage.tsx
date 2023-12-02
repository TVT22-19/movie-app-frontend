import {Navigate, useParams} from "react-router-dom";
import {Card, CardContent, Divider, Rating, Stack, TextField, Typography} from "@mui/material";
import {useAuth} from "../hooks/useAuth.tsx";

export default function MoviePage() {

    const {isAuthorized} = useAuth()

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found"/>


    return (
        <Stack spacing={2}>
            <Card>
                <Stack direction="row">
                    <img src="https://dummyimage.com/1000/000000/ffffff" alt="Movie Image" width="512px"/>
                    <CardContent>
                        <Stack direction="row" spacing={2}>
                            <Stack>
                                <Typography variant="h4">Movie title</Typography>
                                <Typography variant="h6">Year: 2023</Typography>
                                <Rating readOnly value={3}/>
                                <Divider style={{paddingBottom: 16}}/>
                                <Typography variant="body1" style={{paddingTop: 16}}>Movie description</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Stack>
            </Card>

            <Divider/>

            {isAuthorized && <TextField label="Comment" variant="outlined"/>}

            {[1, 2, 3].map(value => (
                <Card>
                    <CardContent>
                        <Typography variant="h6">{value}. Spider-man Across The JavaScript</Typography>
                        <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque
                            doloribus.</Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    )
}