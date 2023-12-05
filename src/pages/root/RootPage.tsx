import {Link, Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {AccountCircle, Add, DarkMode, LightMode, Logout, People} from "@mui/icons-material";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useThemeSwitch} from "../../hooks/useThemeSwitch.tsx";
import {StyledField} from "./components/StyledField.tsx";
import Sidebar from "./components/Sidebar.tsx";
import GroupCreationDialog from "./dialog/GroupCreationDialog.tsx";

export default function RootPage() {

    const navigate = useNavigate()

    const theme = useTheme();
    const {toggleColorMode} = useThemeSwitch();

    const {isAuthorized, setToken} = useAuth()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [openGroupCreateDialog, setOpenGroupCreateDialog] = useState(false)

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
                                <IconButton size="large" color="inherit" onClick={
                                    (event) => setAnchorEl(event.currentTarget)
                                }>
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                                    keepMounted
                                    transformOrigin={{vertical: 'top', horizontal: 'right',}}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null)
                                        navigate(`profile/1`);
                                    }}>
                                        <ListItemIcon>
                                            <People fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>Profile</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null)
                                        setOpenGroupCreateDialog(true)
                                    }}>
                                        <ListItemIcon>
                                            <Add fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText> Create group</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null)
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
