import {Link, Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CssBaseline,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {
    AccountCircle,
    Add,
    Cancel,
    Check,
    DarkMode,
    LightMode,
    Logout,
    Notifications,
    People
} from "@mui/icons-material";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useThemeSwitch} from "../../hooks/useThemeSwitch.tsx";
import {StyledField} from "./components/StyledField.tsx";
import Sidebar from "./components/Sidebar.tsx";
import GroupCreationDialog from "./dialog/GroupCreationDialog.tsx";
import {useAnswerToJoinRequest, useGroupInvites} from "../../services/groups.ts";

export default function RootPage() {

    const navigate = useNavigate()

    const theme = useTheme();
    const {toggleColorMode} = useThemeSwitch();

    const {isAuthorized, setToken, getToken} = useAuth()

    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const [notifyAnchorEl, setNotifyAnchorEl] = useState<null | HTMLElement>(null);

    const [openGroupCreateDialog, setOpenGroupCreateDialog] = useState(false)

    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const user = JSON.parse(atob(getToken()!.split(".")[1]))

    const {data} = useGroupInvites(user.userId, isAuthorized)
    const answerToJoinRequestMutation = useAnswerToJoinRequest()

    return (
        <Box sx={{display: 'flex'}}>
            <GroupCreationDialog open={openGroupCreateDialog} setOpen={setOpenGroupCreateDialog}/>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Button variant="text" color="inherit" onClick={() => navigate("/")}>
                        <Typography variant="h6" noWrap>Movie App</Typography>
                    </Button>

                    <StyledField/>

                    <Box sx={{display: 'flex'}}>
                        <IconButton size="large" color="inherit" onClick={toggleColorMode}>
                            {theme.palette.mode === 'dark' ? <DarkMode/> : <LightMode/>}
                        </IconButton>
                        {isAuthorized ? <>
                                <IconButton size="large" color="inherit" onClick={(event) => {
                                    setNotifyAnchorEl(event.currentTarget)
                                }}>
                                    <Notifications/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={notifyAnchorEl}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                                    keepMounted
                                    transformOrigin={{vertical: 'top', horizontal: 'right',}}
                                    open={Boolean(notifyAnchorEl)}
                                    onClose={() => setNotifyAnchorEl(null)}
                                    slotProps={{
                                        paper: {
                                            style: {
                                                maxHeight: 128 * 4.5,
                                                paddingRight: 6,
                                                paddingLeft: 6
                                            }
                                        }
                                    }}
                                >
                                    <Stack spacing={1}>
                                        {data ? data.map((group) =>
                                            group.requests.map((user) => (
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h6">Join Request</Typography>
                                                        <Typography variant="body1">Group: {group.group_id}</Typography>
                                                        <Typography variant="body1">User: {user.user_id}</Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing
                                                                 style={{justifyContent: "space-evenly"}}>
                                                        <IconButton disabled={buttonsDisabled} onClick={() => {
                                                            setButtonsDisabled(true)
                                                            answerToJoinRequestMutation.mutate({
                                                                userId: user.user_id,
                                                                groupId: group.group_id,
                                                                choice: true
                                                            }, {
                                                                onSettled: () => setButtonsDisabled(false)
                                                            })
                                                        }}>
                                                            <Check/>
                                                        </IconButton>
                                                        <IconButton disabled={buttonsDisabled} onClick={() => {
                                                            setButtonsDisabled(true)
                                                            answerToJoinRequestMutation.mutate({
                                                                userId: user.user_id,
                                                                groupId: group.group_id,
                                                                choice: false
                                                            }, {
                                                                onSettled: () => setButtonsDisabled(false)
                                                            })
                                                        }}>
                                                            <Cancel/>
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            ))) : <Typography variant="body2">Emtpy</Typography>}
                                    </Stack>
                                </Menu>
                                <IconButton size="large" color="inherit" onClick={
                                    (event) => setProfileAnchorEl(event.currentTarget)
                                }>
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={profileAnchorEl}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                                    keepMounted
                                    transformOrigin={{vertical: 'top', horizontal: 'right',}}
                                    open={Boolean(profileAnchorEl)}
                                    onClose={() => setProfileAnchorEl(null)}
                                >
                                    <MenuItem onClick={() => {
                                        setProfileAnchorEl(null)
                                        navigate(`profile/${user.userId}`);
                                    }}>
                                        <ListItemIcon>
                                            <People fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>Profile</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setNotifyAnchorEl(null)
                                        setOpenGroupCreateDialog(true)
                                    }}>
                                        <ListItemIcon>
                                            <Add fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText> Create group</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setProfileAnchorEl(null)
                                        setToken("")
                                        console.log("Have a nice day :)")
                                    }}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
                            : <Button color="inherit" component={Link} to="login">Login</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar/>
            <Box component="main" sx={{flexGrow: 1, padding: 4, paddingRight: 34}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    )
}
