import {Avatar, Card, CardContent, CardHeader, Fab, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {GroupAdd, Groups as GroupIcon} from "@mui/icons-material";
import {blue} from '@mui/material/colors';
import {useAuth} from "../../hooks/useAuth.tsx";
import {Navigate, useParams} from "react-router-dom";

export default function GroupPage() {

    const {isAuthorized} = useAuth()

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found"/>

    const members = [
        {
            id: 1,
            username: 'User1',
            avatar: ''
        },
        {
            id: 2,
            username: 'User2',
            avatar: ''
        },
        {
            id: 3,
            username: 'User3',
            avatar: ''
        },
        {
            id: 4,
            username: 'User4',
            avatar: ''
        },
        {
            id: 5,
            username: 'User5',
            avatar: ''
        },
    ]

    const news = [
        {
            id: 1,
            title: 'Title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },
        {
            id: 2,
            title: 'Title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },
        {
            id: 3,
            title: 'Title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },

    ];

    return (
        <>
            <Stack spacing={2}>
                <Card>
                    <CardHeader avatar={
                        <Avatar sx={{bgcolor: blue[500], width: 56, height: 56}}>
                            <GroupIcon/>
                        </Avatar>
                    } title={
                        <h2>Group name</h2>
                    }/>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardContent>
                </Card>

                <Typography variant="h4">Members</Typography>

                <Grid container>
                    {members.map((member) => (
                        <Grid key={member.id} paddingRight={2} paddingBottom={2}>
                            <Card>
                                <CardContent>
                                    <Stack spacing={2} direction="row" style={{alignItems: 'center'}}>
                                        <Avatar src={member.avatar} alt={member.username}/>
                                        <Typography variant="subtitle2">{member.username}</Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4">Discussion</Typography>

                <Card>
                    <CardContent>
                        <Typography>Discussion...</Typography>
                    </CardContent>
                </Card>

                <Typography variant="h4">News</Typography>

                <Stack spacing={2}>
                    {news.map((member) => (
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{member.id}. {member.title}</Typography>
                                <Typography variant="subtitle2">{member.content}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {isAuthorized &&
                    <Fab color="primary" sx={{position: 'fixed', bottom: 16, right: 16 + 240}} onClick={() => {
                        // TODO Open...
                    }}>
                        <GroupAdd/>
                    </Fab>}
            </Stack>
        </>
    )
}