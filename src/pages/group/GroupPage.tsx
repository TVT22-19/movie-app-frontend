import { Avatar, Card, CardContent, CardHeader, Fab, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { GroupAdd, Groups as GroupIcon } from "@mui/icons-material";
import { blue } from '@mui/material/colors';
import { useAuth } from "../../hooks/useAuth.tsx";
import { useState, useEffect } from "react";
import GroupCreationDialog from "./dialog/GroupCreationDialog.tsx";
import { Navigate, useParams } from "react-router-dom";

export default function GroupPage() {

    const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);

    interface GroupData {
        name: string;
        description: string;
        avatar_url: string;
    }

    const [groupNotFound, setGroupNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<GroupData | null>(null);
    const [membersData, setMembersData] = useState(null);

    const { isAuthorized } = useAuth()

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found" />


    const members = [
        {
            id: 1,
            username: 'User1',
            avatar: ''
        }
    ]

    const news = [
        {
            id: 1,
            title: 'Title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        }

    ];

    useEffect(() => {
        console.log('groupid: ', groupId);

        fetch(`http://localhost:3001/group/${groupId}`)
            .then((response) => {
                if (response.status === 404) {
                    setGroupNotFound(true);
                    setLoading(false);
                    return null; // Returning null to stop the promise chain
                }
                return response.json();
            })
            .then((fetchedData) => {
                if (fetchedData !== null) {
                    setData(fetchedData);
                    setLoading(false);
                    console.log('Fetched data:', fetchedData);
                }
            })
            .catch((error) => {
                console.error('Error fetching group data:', error);
                setLoading(false);//
            });
    }, [groupId]);

    useEffect(() => {
        console.log('groupid: ', groupId);

        fetch(`http://localhost:3001/group/members/${groupId}`)
            .then((response) => {
                if (response.status === 404) {
                    setGroupNotFound(true);
                    setLoading(false);
                    return null; 
                }
                return response.json();
            })
            .then((fetchedData) => {
                if (fetchedData !== null) {
                    setMembersData(fetchedData);
                    setLoading(false);
                    console.log('Fetched data:', fetchedData);
                }
            })
            .catch((error) => {
                console.error('Error fetching group members:', error);
                setLoading(false);//
            });
    }, [groupId]);



    if (loading) {
        return <div>Loading...</div>;
    }


    if (groupNotFound) {
        console.log('Group not found');
        return <Navigate to="/page-not-found" />;
    }


    return (
        <>
            <GroupCreationDialog open={openCreateGroupDialog} setOpen={setOpenCreateGroupDialog} />
            <Stack spacing={2}>
                <Card>
                    <CardHeader avatar={
                        <Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }}>
                            <GroupIcon />
                        </Avatar>
                    } title={
                        data ? <h2>{data.name}</h2> : <div>Loading...</div>
                    } />
                    <CardContent>
                        {data ? (
                            <>{data.description}</>
                        ) : (
                            <div>Loading...</div> //kind of useless but this avoids the data might be null warning.
                        )}
                        
                    </CardContent>
                </Card>

                <Typography variant="h4">Members: {membersData /*test*/}</Typography> 

                <Grid container>
                    {members.map((member) => (
                        <Grid key={member.id} paddingRight={2} paddingBottom={2}>
                            <Card>
                                <CardContent>
                                    <Stack spacing={2} direction="row" style={{ alignItems: 'center' }}>
                                        <Avatar src={member.avatar} alt={member.username} />
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
                        <Card key={member.id}>
                            <CardContent>
                                <Typography variant="h5">{member.id}. {member.title}</Typography>
                                <Typography variant="subtitle2">{member.content}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {isAuthorized &&
                    <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 + 240 }}
                        onClick={() => setOpenCreateGroupDialog(true)}>
                        <GroupAdd />
                    </Fab>}
            </Stack>
        </>
    );
}