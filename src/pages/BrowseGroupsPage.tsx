import React from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, CardActionArea, CardHeader, Divider, Stack, Typography} from "@mui/material";
import {useGroups} from "../services/groups.ts";

export default function BrowseGroupsPage() {

    const navigate = useNavigate()
    const {data: groups} = useGroups()

    return (
        <>
            <Typography variant="h4">Browse All Groups</Typography>
            <Typography variant="h6" paddingBottom={2}>Click on the group name to open the group's page</Typography>
            <Stack spacing={2}>
                <Divider/>
                {groups ? groups.map((group) => (
                    <Card key={group.id}>
                        <CardActionArea onClick={() => navigate(`/group/${group.id}`)}>
                            <CardHeader avatar={
                                <Avatar>{group.name.charAt(0)}</Avatar>
                            } title={group.name}/>
                        </CardActionArea>
                    </Card>
                )) : <Typography variant="body2" color="textSecondary">No groups available.</Typography>}
            </Stack>
        </>
    );
}