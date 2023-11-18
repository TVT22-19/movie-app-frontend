import { styled } from '@mui/system';
import { Avatar, Grid, Card, Box, CardContent, Fab, CardHeader, Stack, Typography } from "@mui/material";
import { Groups as GroupIcon, GroupAdd } from "@mui/icons-material";
import { blue, red } from '@mui/material/colors';

const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(35),
}));

const membersData = [
    { id: 1, username: 'User1', avatar: '' },
    { id: 2, username: 'User2', avatar: '' },
    { id: 3, username: 'User3', avatar: '' },
    { id: 4, username: 'User4', avatar: '' },
    { id: 5, username: 'User5', avatar: '' },
];
const newsData = [
    { id: 1, title: 'Title', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
    { id: 2, title: 'Title', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
    { id: 3, title: 'Title', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },

];


export default function GroupPage() {
    return (
        <Grid >
            <Card>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }}>
                        <GroupIcon />
                    </Avatar>
                    } title={<h2>Group name</h2>}
                />
                <CardContent>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h4">Members</Typography>
                </CardContent>
            </Card>



            <Grid container spacing={2} style={{ backgroundColor: 'inherit', padding: 20 }}>
                {membersData.map((member) => (
                    <Grid key={member.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={member.avatar} alt={member.username} style={{ margin: '15px' }} />

                                <Typography variant="subtitle2">{member.username}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>



            <Card>
                <CardContent>
                    <Typography variant="h4">Discussion</Typography>
                    <Typography>Discussion</Typography>

            

                </CardContent>
            </Card>
            <Card>

                <CardContent>
                    <Typography variant="h4">News</Typography>
                    <Grid container spacing={2} style={{ backgroundColor: 'inherit', padding: 20 }}>
                {newsData.map((member) => (
                    <Grid key={member.id} item lg={13}>
                        <Card>
                        

                                <Typography variant="h5">{member.title}</Typography>
                                <Typography variant="subtitle2">{member.content}</Typography>
                           
                        </Card>
                    </Grid>
                ))}
            </Grid>
                </CardContent>
            </Card>


            <StyledFab color="primary" aria-label="add" >
                <GroupAdd />
            </StyledFab>
        </Grid>
    )
}