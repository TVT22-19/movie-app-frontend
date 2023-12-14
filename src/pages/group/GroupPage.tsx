import {
    Avatar,
    Box,
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

import { useCheckMembership, useCheckOwnership, useFetchDiscussionPosts, useFetchGroupInfo, useFetchMembers, useCreateJoinRequest } from "./groupqueries.ts";
import { createDiscussionPost } from "./groupAPI.ts";
import { User } from "../../services/types.ts";
import { JoinRequestBody } from "./types.ts";

export default function GroupPage() {

    const createJoinRequestMutation = useCreateJoinRequest();

    const { isAuthorized, getToken } = useAuth();
    let user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined;

    const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
    const [openRemoveMemberDialog, setOpenRemoveMemberDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [requestSent, setRequestSent] = useState(false);

    const userId = user?.userId;

    const groupId = Number(useParams().id)
    if (Number.isNaN(groupId)) return <Navigate to="/page-not-found" />

    //TODO: limit news posts amount? 20 most recent or something

    const handleRemoveClick = (userId: number) => {
        setSelectedUserId(userId);
        setOpenRemoveMemberDialog(true);
    };

    const handleRemoveCancel = () => {
        setOpenRemoveMemberDialog(false);
    };

    const handleRequestSent = () => {
        setRequestSent(true);
    };

    const handleCreatePost = async (title: string, content: string) => {
        try {
            console.log(title, content, groupId, userId);
            if (userId !== undefined) {
                const responseData = await createDiscussionPost(title, content, groupId, userId);
            }

            refetchPosts();

        } catch (error) {
            console.error('Error creating post', error);
        }

    };

    //GET GROUP INFO, MEMBERS, POSTS
    const { data: groupInfoData, error: infoError, isLoading: infoLoading } = useFetchGroupInfo(groupId);
    const { data: membersData, error: membersError, isLoading: membersLoading } = useFetchMembers(groupId);
    const { data: posts, error: postsError, isLoading: postsLoading, refetch: refetchPosts } = useFetchDiscussionPosts(groupId);

    // CHECK OWNERSHIP/MEMBERSHIP
    const { data: isOwner, error: ownershipError, isLoading: ownershipLoading } = useCheckOwnership(userId || 0, groupId);
    const { data: isMember, error: membershipError, isLoading: membershipLoading } = useCheckMembership(userId || 0, groupId);


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


    return (
        <div>
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
                                            {isOwner && (userId!==member.id) ? (<IconButton color="error" onClick={() => handleRemoveClick(member.id)}>
                                                <CancelIcon />
                                            </IconButton>
                                            ) : (
                                                <Box></Box>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No members found</Typography>
                )}


                {isMember ? (

                    <div>
                        <Typography variant="h5">Group News</Typography>

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
                        <Button onClick={() => setOpenCreatePostDialog(true)}> Create news post </Button>

                    </div>) : (
                        <div>

                        {!requestSent ? (
                        <Button variant="contained" onClick={() => {
                        createJoinRequestMutation.mutate({
                            userId: userId,
                            groupId: groupId,
                        } as JoinRequestBody, {
                            onSuccess: () => console.log("Request sent", userId, groupId),
                            onSettled: () => handleRequestSent()
                        })
                    }}
                    >Request to join this group </Button>


                        ): (
                            <Typography> Request sent </Typography>
                        )}
                    
                    </div>
                )}
            </Stack>
        </div>

    )
}
