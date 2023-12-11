import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import { Check, Close, Group, Add } from "@mui/icons-material";
import { useGroupInvites, useGroups } from "../../../services/groups.ts";
import { useAuth } from "../../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

    const drawerWidth = 240;

    const { isAuthorized } = useAuth()

    const { data: groups } = useGroups(isAuthorized)
    const { data: groupInvites } = useGroupInvites(isAuthorized)

    const navigate = useNavigate()

    return (
        <Drawer variant="permanent" anchor="right" sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box'
            },
        }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('browsegroups')}>
                            <ListItemIcon>
                                <Add /> 
                            </ListItemIcon>
                            <ListItemText primary="Browse groups" />
                        </ListItemButton>
                    </ListItem>
                    {isAuthorized &&
                        <>
                            <Divider />
                            {groups?.map(group => (
                                <ListItem key={group.id} disablePadding>
                                    <ListItemButton onClick={() => navigate(`group/${group.id}`)}>
                                        <ListItemIcon>
                                            <Group />
                                        </ListItemIcon>
                                        <ListItemText primary={group.name} />
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