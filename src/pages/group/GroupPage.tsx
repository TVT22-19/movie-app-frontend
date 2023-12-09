import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
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
import RemoveMemberDialog from "./dialog/RemoveMemberDialog.tsx";

import { useCheckMembership, useCheckOwnership, useFetchDiscussionPosts, useFetchGroupInfo, useFetchMembers, useRemoveMember} from "./groupqueries.ts";

export default function GroupPage() {

    const {getToken} = useAuth()

    const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
    const [openRemoveMemberDialog, setOpenRemoveMemberDialog] = useState(false);
    const [groupNotFound, setGroupNotFound] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const [userId, setUserId] = useState(1);

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found"/>

    //const removeMemberQuery = useRemoveMember(selectedUserId, groupId);

    const handleRemoveClick = (userId: number) => {
        setSelectedUserId(userId);
        setOpenRemoveMemberDialog(true);
      };
    
      const handleRemoveCancel = () => {
        setOpenRemoveMemberDialog(false);
      };
    
      const handleRemoveConfirm = () => {
        
        //removeMemberQuery.refetch(); ?
        setOpenRemoveMemberDialog(false);

      };

      const handleCreatePost = () => {

      }
      
  
    //GET GROUP INFO, MEMBERS, POSTS
    const { data: groupInfoData, error: infoError, isLoading: infoLoading } = useFetchGroupInfo(groupId);
    const { data: membersData, error: membersError, isLoading: membersLoading } = useFetchMembers(groupId);
    const { data: posts, error: postsError, isLoading: postsLoading } = useFetchDiscussionPosts(groupId);

   // CHECK OWNERSHIP/MEMBERSHIP
    const { data: isOwner, error: ownershipError, isLoading: ownershipLoading } = useCheckOwnership(userId, groupId);
    const { data: isMember, error: membershipError, isLoading: membershipLoading } = useCheckMembership(userId, groupId);


      if (membersLoading || postsLoading || infoLoading) {
        return <div>Loading...</div>;
      }
    
      if (membersError) {
        console.log("Error fetching group members:", membersError); //currently throws this error if group has no members 
        return <div>Error fetching group members</div>;
      }
      if (postsError) {
        console.log("Error fetching posts:", postsError);
        return <div>Error fetching posts</div>;
      }
      if (infoError) {
        console.log("Error fetching info:", infoError);
        return <div>Error fetching group info</div>;
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
            <RemoveMemberDialog
            open={openRemoveMemberDialog}
            selectedUserId={selectedUserId}
            groupId={groupId}
            onClose={handleRemoveCancel}
            />

            <Stack spacing={2}>
                <Card>
                    <CardHeader avatar={
                        <Avatar sx={{bgcolor: blue[500], width: 56, height: 56}}>
                            <GroupIcon/>
                        </Avatar>
                    } title={groupInfoData ? <h2>{groupInfoData.name}</h2> : <div>Loading...</div>}/>
                    <CardContent>{groupInfoData?.description ?? <div>Loading...</div>}</CardContent>
                </Card>

                <Typography variant="h5">Members:</Typography>

                {membersData && membersData.length > 0 ? (
                        <Grid container>
                        {membersData.map((member) => (
                            <Grid key={member.id} paddingRight={2} paddingBottom={2}>
                            <Card>
                                <CardContent>
                                <Stack spacing={2} direction="row" style={{ alignItems: "center" }}>
                                    <Avatar src={member.avatar} alt={member.username} />
                                    <Typography>{member.username}</Typography>
                                   {/* Is owner? */}
                                    <IconButton color="error" onClick={() => handleRemoveClick(member.id)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Stack>
                                </CardContent>
                            </Card>
                            </Grid>
                        ))}
                        </Grid>
                    ) : (
                        <Typography>No members found</Typography>
                    )}

                {/*(isMember) && (*/}
                    <div>
                        <Typography variant="h4">Discussion</Typography>

                        {posts && posts.length > 0 ? (
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
                        </Stack>
                  ) : (
                        <Typography>No posts </Typography>
                    )}
                            <Button onClick={() => setOpenCreatePostDialog(true)}> Create discussion post </Button>

                    </div>
                

                {(!isMember) && (
                    <Button> Request to join this group </Button>
                )}
            </Stack>
  </>

    )
}

///delete all this, was just for reference

//const [data, setData] = useState<GroupData | null>(null);
    //const [membersData, setMembersData] = useState<Member[]>([]);
    //const [isOwner, setIsOwner] = useState(true); // testing
    //const [isMember, setIsMember] = useState(true); //testing 
     //const [posts, setPosts] = useState<Post[]>([]);

    /*
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
    */


  /*
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

    */


    //CREATE DISCUSSION POST
   /* const handleCreatePost = async (title: string, content: string) => {
        try {
            const userID = 1; // FOR NOW - fix once jwt available

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
    };*/

      /*const fetchDiscussionPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3001/group-post/${groupId}`)
            const data = await response.json();
            setPosts(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data from the backend', error);
        }
    };*/

   
/*
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

    };*/

       /* // CHECKING MEMBERSHIP
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
    }, []);*/

  