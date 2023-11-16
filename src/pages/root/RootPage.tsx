import {Link, Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {AccountCircle, DarkMode, Group, LightMode} from "@mui/icons-material";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useThemeSwitch} from "../../hooks/useThemeSwitch.tsx";
import {StyledField} from "./components/StyledField.tsx";

export default function RootPage() {

    const navigate = useNavigate()

    const theme = useTheme();
    const {toggleColorMode} = useThemeSwitch();

    const {isAuthorized, setToken} = useAuth()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const drawerWidth = 240;

    const dumpGroups = [
        "Group 1",
        "Group 2",
        "Group 3",
        "Group 4",
    ]

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
                                        navigate("/profile");
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null)
                                        setToken("")
                                        console.log("Have a nice day :)")
                                    }}>Logout</MenuItem>
                                </Menu>
                            </>
                            : <Button color="inherit" component={Link} to="login">Login</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" anchor="right" sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                },
            }}>
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {dumpGroups.map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Group/>
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, padding: 4, paddingRight: 34}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    )
}
