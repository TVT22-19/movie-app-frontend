import {Outlet, useNavigate} from "react-router-dom";
import {
    alpha,
    AppBar,
    Box, Button,
    CssBaseline,
    Drawer,
    IconButton, InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled,
    Toolbar,
    Typography
} from "@mui/material";
import {AccountCircle, DarkMode, Group, LightMode, Search as SearchIcon} from "@mui/icons-material";
import {useState} from "react";

export default function RootPage() {

    const navigate = useNavigate()

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const drawerWidth = 240;

    const dumpGroups = [
        "Group 1",
        "Group 2",
        "Group 3",
        "Group 4",
    ]

    const [darkMode, setDarkMode] = useState(false)

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Button variant="text" color="inherit" onClick={() => navigate("/")}>
                        <Typography variant="h6" noWrap>Movie App</Typography>
                    </Button>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size="large" color="inherit" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <DarkMode/> : <LightMode/>}
                        </IconButton>
                        <IconButton size="large" edge="end" color="inherit">
                            <AccountCircle/>
                        </IconButton>
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
