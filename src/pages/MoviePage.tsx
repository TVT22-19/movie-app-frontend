import {Navigate, useParams} from "react-router-dom";
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
    Typography
} from "@mui/material";
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

            {isAuthorized && <FormControl variant="outlined">
                <InputLabel>Comment</InputLabel>
                <OutlinedInput endAdornment={
                    <InputAdornment position="end">
                        <Rating/>
                    </InputAdornment>
                } label="Comment"/>
            </FormControl>}

            {[1, 2, 3].map(value => (
                <Card>
                    <CardContent>
                        <Stack direction="row">
                            <Typography flexGrow={1} variant="h6">{value}. Spider-man Across The JavaScript</Typography>
                            <Rating value={Math.random() * (5 - 1) + 1}/>
                        </Stack>
                        <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque
                            doloribus.</Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    )
}