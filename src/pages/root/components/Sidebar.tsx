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
import {Check, Close, Group} from "@mui/icons-material";
import {useGroupInvites, useGroups} from "../../../services/groups.ts";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

export default function Sidebar() {

    const drawerWidth = 240;

    const {isAuthorized} = useAuth()

    const {data: groups} = useGroups(isAuthorized)
    const {data: groupInvites} = useGroupInvites(isAuthorized)

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
                    {isAuthorized &&
                        <>
                            {groupInvites?.map(group => (
                                <ListItem key={group.id}>
                                    <ListItemIcon>
                                        <Group/>
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography overflow="hidden" textOverflow="ellipsis">
                                            {group.name}
                                        </Typography>
                                    }/>
                                    <IconButton style={{padding: 4}}>
                                        <Check/>
                                    </IconButton>
                                    <IconButton edge="end" style={{padding: 4}}>
                                        <Close/>
                                    </IconButton>
                                </ListItem>
                            ))}
                            <Divider/>
                            {groups?.map(group => (
                                <ListItem key={group.id} disablePadding>
                                    <ListItemButton onClick={() => navigate(`group/${group.id}`)}>
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