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
import { Group, Add } from "@mui/icons-material";
import { useGroupInvites, useGroups } from "../../../services/groups.ts";
import { useAuth } from "../../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { useFetchGroupsByUser } from "../../group/groupqueries.ts";
import { User } from "../../../services/types.ts";
import { FetchGroupsResult, GroupUser } from "../../group/types.ts";

export default function Sidebar() {

    const drawerWidth = 240;

    const { isAuthorized, getToken } = useAuth();
    let user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined;
    const userId = user?.userId;

    const { data: groups } = useGroups(isAuthorized)
    const { data: groupInvites } = useGroupInvites(isAuthorized)
    const { data: groupsData, error: groupsError, isLoading: groupsLoading } = useFetchGroupsByUser(userId || 0) as FetchGroupsResult;

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
                            {groupsData?.map(group => (
                                <ListItem key={group.group_id} disablePadding>
                                    <ListItemButton onClick={() => navigate(`group/${group.group_id}`)}>
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