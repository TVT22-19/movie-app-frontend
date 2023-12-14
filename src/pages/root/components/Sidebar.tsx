import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import {Add, Group} from "@mui/icons-material";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {useFetchGroupsByUser} from "../../group/groupqueries.ts";
import {User} from "../../../services/types.ts";

export default function Sidebar() {

    const drawerWidth = 240;

    const {isAuthorized, getToken} = useAuth();
    let user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined
    const userId = user?.userId;

    const {data: groupsData} = useFetchGroupsByUser(userId);

    const navigate = useNavigate()

    return (
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
                    <ListItem key={0} disablePadding>
                        <ListItemButton onClick={() => navigate('browsegroups')}>
                            <ListItemIcon>
                                <Add/>
                            </ListItemIcon>
                            <ListItemText primary="Browse groups"/>
                        </ListItemButton>
                    </ListItem>
                    {isAuthorized &&
                        <>
                            <Divider/>
                            {groupsData?.map(group => (
                                <ListItem key={group.group_id} disablePadding>
                                    <ListItemButton onClick={() => navigate(`group/${group.group_id}`)}>
                                        <ListItemIcon>
                                            <Group/>
                                        </ListItemIcon>
                                        <ListItemText primary={group.name}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    }
                </List>
            </Box>
        </Drawer>
    )
}