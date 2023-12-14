import {Alert, Avatar, Card, CardContent, Divider, IconButton, Link, Rating, Stack, Typography} from "@mui/material";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Delete, Edit,} from "@mui/icons-material";
import {useState} from "react";
import ProfileEditDialog from "./dialog/ProfileEditDialog.tsx";
import ProfileDeleteDialog from "./dialog/ProfileDeleteDialog.tsx";
import {useUser} from "../../services/users.ts"
import {useReviews} from "../../services/reviews.ts"
import {useAuth} from "../../hooks/useAuth.tsx";
import {User} from "../../services/types.ts";

export default function ProfilePage() {

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const {getToken} = useAuth()
    const navigate = useNavigate()

    const profileId = Number(useParams().id)
    if (Number.isNaN(profileId)) return <Navigate to="/page-not-found"/>
    let user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined;

    const isProfileOwner = (user?.userId === profileId) || false

    const {data: userData, status: userStatus, error: userError} = useUser(profileId)
    const {data: reviewData, status: reviewStatus, error: reviewError} = useReviews(profileId)

    if(userStatus === "pending") return (<h1>Loading...</h1>)

    if(userStatus === "error"){
        console.log(userError.message, {variant: "error"})
        return <Alert severity="error">User not exist</Alert>
    }

    if(userStatus === "success"){
        console.log("User data retrieved")
    }

    if(reviewStatus === "pending") return (<h1>Loading...</h1>)

    if(reviewStatus === "error"){
        console.log(reviewError.message, {variant: "error"})
    }

    if(reviewStatus === "success"){
        console.log("Reviews retrieved successfully")
    }

      const handleMovieClick = (movieId: number) =>  {
        navigate(`/movie/${movieId}`);
    }
    
    return (
        <>
            <ProfileEditDialog open={openEditDialog} setOpen={setOpenEditDialog} user={userData!} />
            <ProfileDeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} user={userData!}/>
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
                            { isProfileOwner! ? <Stack>
                                <IconButton onClick={() => setOpenEditDialog(true)}>
                                    <Edit/>
                                </IconButton>
                                <IconButton onClick={() => setOpenDeleteDialog(true)} >
                                    <Delete color="error"/>
                                </IconButton>
                            </Stack> : <></>}
                        </Stack>
                    </CardContent>
                </Card>

                <Divider/>

                <Typography variant="h4" textAlign="center">Reviews</Typography>
                {reviewData?.length! > 0 ? reviewData?.map((data) =>
                    <Card>
                        <CardContent>
                             <Link component="button" 
                                onClick={() => handleMovieClick(data.movie_id)}
                                underline="always"> 
                                 {data.movie_name}
                                </Link>
                            
                            <Stack alignSelf="end">
                            {data.rating !== null && <Rating readOnly value={data.rating} />}
                                
                            </Stack>
                            <Stack spacing={2} direction="row" alignSelf="start">
                                {data.content}
                            </Stack>
                               
                            
                        </CardContent>
                    </Card>
                ) : <Card>
                        <CardContent>
                            <Stack>
                                No reviews yet
                            </Stack>
                        </CardContent>
                    </Card>}
            </Stack>
        </>
    )
}