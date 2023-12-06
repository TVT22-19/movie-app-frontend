import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Avatar, Card, CardContent, CardHeader, Stack, Typography, useTheme
} from "@mui/material";

export default function BrowseGroupsPage() {
    const [groups, setGroups] = useState([]);
    const theme = useTheme();

    useEffect(() => {
       
        const fetchGroups = async () => {
            try {
                const response = await fetch("http://localhost:3001/group/allgroups");
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error("Error fetching groups", error);
            }
        };

        fetchGroups();
    }, []); 

    return (
        <>
          <Card>
                <CardHeader
                    title="Browse All Groups"
                    subheader="Click on the group name to open the group's page."
                />
                <CardContent>
                    <Stack spacing={2}>
                        {groups.map((group) => (
                            <Card key={group.id}>
                                <CardHeader
                                    avatar={<Avatar>{group.name.charAt(0)}</Avatar>}
                                    title={
                                        <Link
                                        to={`/group/${group.id}`}
                                        style={{ color: theme.palette.text.primary }}
                                    >
                                        {group.name}
                                    </Link>
                                    }
                                />
                            </Card>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}
