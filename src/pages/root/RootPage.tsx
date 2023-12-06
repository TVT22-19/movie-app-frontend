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
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {AccountCircle, Cancel, Check, DarkMode, LightMode, Notifications} from "@mui/icons-material";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useThemeSwitch} from "../../hooks/useThemeSwitch.tsx";
import {StyledField} from "./components/StyledField.tsx";
import Sidebar from "./components/Sidebar.tsx";

export default function RootPage() {

    const navigate = useNavigate()

    const theme = useTheme();
    const {toggleColorMode} = useThemeSwitch();

    const {isAuthorized, setToken} = useAuth()

    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const [notifyAnchorEl, setNotifyAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Box sx={{display: 'flex'}}>
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
                                        {[1, 2, 3, 4, 5, 6, 7].map(value => (
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">Join Request</Typography>
                                                    <Typography variant="body1">{value} group name...</Typography>
                                                    <Typography variant="body1">username...</Typography>
                                                </CardContent>
                                                <CardActions disableSpacing style={{justifyContent: "space-evenly"}}>
                                                    <IconButton>
                                                        <Check/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <Cancel/>
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        ))}
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
                                        navigate(`profile/1`);
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        setProfileAnchorEl(null)
                                        setToken("")
                                        console.log("Have a nice day :)")
                                    }}>Logout</MenuItem>
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
