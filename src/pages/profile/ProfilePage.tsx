import {Avatar, Card, CardContent, Divider, IconButton, Stack, Typography} from "@mui/material";
import {Navigate, useParams, useLocation} from "react-router-dom";
import {ContentPasteSearchOutlined, DateRange, Delete, Edit,} from "@mui/icons-material";
import {useState} from "react";
import ProfileEditDialog from "./dialog/ProfileEditDialog.tsx";

import {useUser} from "../../services/users.ts"
import {User, Reviews} from "../../services/types.ts"
import {useReviews} from "../../services/reviews.ts"

export default function ProfilePage() {

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const profileId = Number(useParams().id)
    if (Number.isNaN(profileId)) return <Navigate to="/page-not-found"/>

    const {data: userData, status: userStatus, error: userError} = useUser(profileId)
    const {data: reviewData, status: reviewStatus, error: reviewError} = useReviews(profileId)

    if(userStatus === "pending") return (<h1>Loading...</h1>)

    if(userStatus === "error"){
        console.log(userError.message, {variant: "error"})
    }

    if(userStatus === "success"){
        console.log(`Found user with ID: ${profileId}`)
    }

    if(reviewStatus === "pending") return (<h1>Loading...</h1>)

    if(reviewStatus === "error"){
        console.log(reviewError.message, {variant: "error"})
    }

    if(reviewStatus === "success"){
        console.log(`Found review with ID: ${profileId}`)
        console.log(reviewData)
    }

    return (
        <>
            <ProfileEditDialog open={openEditDialog} setOpen={setOpenEditDialog}/>
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
                                <Typography>{userData?.username} ({userData?.firstname} {userData?.lastname})</Typography>
                                <Typography>Age: {userData?.age}</Typography>
                                <Typography>Registered: {new Date(userData?.registration_date!!).toLocaleDateString()}</Typography>
                            </Stack>
                            <Stack>
                                <IconButton onClick={() => setOpenEditDialog(true)}>
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
                {reviewData!.map((data) =>
                    <Card>
                        <CardContent>
                            <Stack spacing={2} direction="row" alignSelf="start">
                                {data.content}
                            </Stack>
                            <Stack alignSelf="end">
                                {data.rating}
                            </Stack>
                        </CardContent>
                    </Card>
                )}
            </Stack>
        </>
    )
}