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
import { Groups as GroupIcon } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth.tsx";
import React, { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { blue } from "@mui/material/colors";
import { Navigate, useParams } from "react-router-dom";

import PostCreationDialog from "./dialog/PostCreationDialog.tsx";
import RemoveMemberDialog from "./dialog/RemoveMemberDialog.tsx";

import { useCheckMembership, useCheckOwnership, useFetchDiscussionPosts, useFetchGroupInfo, useFetchMembers } from "./groupqueries.ts";
import { createDiscussionPost } from "./groupAPI.ts";

export default function GroupPage() {

    const { getToken } = useAuth()

    const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
    const [openRemoveMemberDialog, setOpenRemoveMemberDialog] = useState(false);
    const [groupNotFound, setGroupNotFound] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const [userId, setUserId] = useState(1);

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found" />



    const handleRemoveClick = (userId: number) => {
        setSelectedUserId(userId);
        setOpenRemoveMemberDialog(true);
    };

    const handleRemoveCancel = () => {
        setOpenRemoveMemberDialog(false);
    };

    const handleRemoveConfirm = () => {

        //use the useMutation to remove member based on this confirmation.. i don't know how :'D
        setOpenRemoveMemberDialog(false);

    };

    const handleCreatePost = (title: string, content: string) => {
        //    this is more or less how it was, but i changed it to use the createDiscussionPost function instead of direct try-catch and fetch
        try {

            let userID = 1; // FOR NOW - fix once jwt available
            console.log(userID, ' ', groupId);

            //is it fine to do this? i'm not using the useQuery at all then

            const responseData = createDiscussionPost(title, content, groupId, userID);

            // then refresh discussion posts - i wasn't sure how 

        } catch (error) {
            console.error('Error creating post', error);
        }

    };


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
        return <Navigate to="/page-not-found" />;
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
                        <Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }}>
                            <GroupIcon />
                        </Avatar>
                    } title={groupInfoData ? <h2>{groupInfoData.name}</h2> : <div>Loading...</div>} />
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
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography
                                                style={{ fontSize: "0.8rem" }}>{post.username} &bull; {new Date(post.timestamp).toLocaleString()} </Typography>
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
