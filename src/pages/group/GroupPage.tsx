import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Groups as GroupIcon} from "@mui/icons-material";
import {useAuth} from "../../hooks/useAuth.tsx";
import React, {useEffect, useState} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import {blue} from "@mui/material/colors";
import {Navigate, useParams} from "react-router-dom";
import {User} from "../../services/types";
import PostCreationDialog from "./dialog/PostCreationDialog.tsx";

export default function GroupPage() {

    const {getToken} = useAuth()

    const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
    const [groupNotFound, setGroupNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<GroupData | null>(null);
    const [membersData, setMembersData] = useState<Member[]>([]);
    const [isOwner, setIsOwner] = useState(true); // testing
    const [isMember, setIsMember] = useState(true); //testing
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found"/>

    const handleRemoveClick = (userId: number) => {
        setSelectedUserId(userId);
        setOpenDialog(true);
    };

    const handleRemoveConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:3001/group/deletemember/${selectedUserId}/from/${groupId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Member removed successfully');
            } else {
                console.error('Failed to remove member');
                //show error to user?
            }
        } catch (error) {
            console.error('Error removing member:', error);
            //show error to user?

        } finally {
            setOpenDialog(false);
            fetchMembers();
        }
    };

    const handleRemoveCancel = () => {
        setOpenDialog(false);
    };

    const fetchDiscussionPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3001/group-post/${groupId}`)
            const data = await response.json();
            setPosts(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data from the backend', error);
        }
    };

    const fetchMembers = async () => {
        fetch(`http://localhost:3001/group/members/${groupId}`)
            .then((response) => {
                if (!response.ok) {
                    console.error("Error fetching group members data:", response.statusText);
                    return [];
                }
                return response.json();
            })
            .then((members) => {
                setMembersData(members);
                console.log("Group members: ", members);
            })
            .catch((error) => {
                console.error("Error fetching group members data:", error);
            });

    };

    // CHECKING MEMBERSHIP
    useEffect(() => {

        let user: User | null = null;
        const token = getToken();
        if (token) {
            //user = JSON.parse(atob(token.split('.')[1])); //no real token yet so this isn't working
        }
        console.log(user);
        // fetch group membership and owner status
        fetch(`/group/checkifmember...`, {
            //^ not implemented yet

        })
            .then(response => response.json())
            .then(data => {
                setIsMember(data.isMember);
            })
            .catch(error => console.error('Error fetching membership:', error));
    }, []);

    //get group name and description
    useEffect(() => {
        console.log("groupid: ", groupId);

        fetch(`http://localhost:3001/group/${groupId}`)
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
                    setData(fetchedData);
                    setLoading(false);
                    console.log("Fetched data:", fetchedData);
                }
            })
            .catch((error) => {
                console.error("Error fetching group data:", error);
                setLoading(false);
            });
    }, [groupId]);

    //get group members
    useEffect(() => {
        fetchMembers();
    }, [groupId]);


    //GET DISCUSSION POSTS
    useEffect(() => {
        const fetchData = async () => {
            await fetchDiscussionPosts();
        };

        fetchData();
    }, [groupId]);

    //CREATE DISCUSSION POST
    const handleCreatePost = async (title: string, content: string) => {
        try {
            console.log(title, content);
            const userID = 1; // FOR NOW - fix once jwt available
            console.log(userID, ' ', groupId);

            const response = await fetch('http://localhost:3001/group-post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, userID, groupID: groupId, content})
            });

            const responseData = await response.json();
            fetchDiscussionPosts();
            console.log(responseData);
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (groupNotFound) {
        console.log("Group not found");
        return <Navigate to="/page-not-found"/>;
    }

    return (
        <>
            <PostCreationDialog
                open={openCreatePostDialog}
                setOpen={setOpenCreatePostDialog}
                handleCreatePost={handleCreatePost}
            />
            <Stack spacing={2}>
                <Card>
                    <CardHeader avatar={
                        <Avatar sx={{bgcolor: blue[500], width: 56, height: 56}}>
                            <GroupIcon/>
                        </Avatar>
                    } title={data ? <h2>{data.name}</h2> : <div>Loading...</div>}/>
                    <CardContent>{data?.description ?? <div>Loading...</div>}</CardContent>
                </Card>

                <Typography variant="h5">Members:</Typography>

                <Grid container>
                    {membersData ? (
                        membersData.map((member) => (
                            <Grid key={member.id} paddingRight={2} paddingBottom={2}>
                                <Card>
                                    <CardContent>
                                        <Stack spacing={2} direction="row" style={{alignItems: "center"}}>
                                            <Avatar src={member.avatar} alt={member.username}/>
                                            <Typography>{member.username}</Typography>
                                            {isOwner && (
                                                <IconButton color="error" onClick={() => handleRemoveClick(member.id)}>
                                                    <CancelIcon/>
                                                </IconButton>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No members found</Typography>
                    )}
                </Grid>

                {(isMember) && (
                    <div>
                        <Typography variant="h4">Discussion</Typography>


                        <Stack spacing={2}>
                            {posts.map((post) => (
                                <Card key={new Date(post.timestamp).getTime()}>
                                    <CardContent>
                                        <Typography variant="subtitle1">
                                            <u><b>{post.title}</b></u>
                                        </Typography>
                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                            <Typography
                                                style={{fontSize: "0.8rem"}}>{post.username} &bull; {new Date(post.timestamp).toLocaleString()} </Typography>
                                        </div>
                                        <Typography variant="body2">{post.content}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button onClick={() => setOpenCreatePostDialog(true)}> Create discussion post </Button>
                        </Stack>

                    </div>
                )}

                {(!isMember) && (
                    <Button> Request to join this group </Button>
                )}
            </Stack>

            <Dialog open={openDialog} onClose={handleRemoveCancel}>
                {/*currently shows only id oops*/}
                <DialogTitle>{`Remove user with id: ${selectedUserId} from the group?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleRemoveCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveConfirm} color="error">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

interface GroupData {
    name: string;
    description: string;
    avatar_url: string;
}

interface Member {
    id: number;
    username: string;
    avatar: string;
}

interface Post {
    user_id: number;
    title: string;
    content: string;
    timestamp: Date;
    username: string;

}


