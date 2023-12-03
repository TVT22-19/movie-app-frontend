import React, { useEffect, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, Fab, Stack, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { GroupAdd, Groups as GroupIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Navigate, useParams } from "react-router-dom";
import GroupCreationDialog from "./dialog/GroupCreationDialog.tsx";
import PostCreationDialog from "./dialog/PostCreationDialog.tsx";

export default function GroupPage() {
  const { isAuthorized } = useAuth();
  const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
  const [groupNotFound, setGroupNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GroupData | null>(null);
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [isOwner, setIsOwner] = useState(true); // change to false when api check implemented..
  const [isMember, setIsMember] = useState(true); //testing


  const groupId = Number(useParams().id);

  useEffect(() => {
    // fetch group membership and owner status
    fetch(`/group/checkifmember...`, {
      //^ not implemented yet

    })
      .then(response => response.json())
      .then(data => {
        setIsMember(data.isMember);
        setIsOwner(data.isOwner);
      })
      .catch(error => console.error('Error fetching membership:', error));
  }, []);

  //get group name and description
  useEffect(() => {
    console.log("groupid: ", groupId);

    fetch(`http://localhost:3001/group/${groupId}`)
      .then((response) => {
        if (response.status === 404) {
          setGroupNotFound(true);
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData !== null) {
          setData(fetchedData);
          setLoading(false);
          console.log("Fetched data:", fetchedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
        setLoading(false);
      });
  }, [groupId]);

  //get group members
  useEffect(() => {
    fetch(`http://localhost:3001/group/members/${groupId}`)
      .then((response) => {
        if (!response.ok) {
          console.error("Error fetching group members data:", response.statusText);
          return [];
        }
        return response.json();
      })
      .then((members) => {
        setMembersData(members);
        console.log("Group members: ", members);
      })
      .catch((error) => {
        console.error("Error fetching group members data:", error);
      });
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (groupNotFound) {
    console.log("Group not found");
    return <Navigate to="/page-not-found" />;
  }

  return (
    <>
      <GroupCreationDialog open={openCreateGroupDialog} setOpen={setOpenCreateGroupDialog} />
      <PostCreationDialog open={openCreatePostDialog} setOpen={setOpenCreatePostDialog} />
      <Stack spacing={2}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }}>
                <GroupIcon />
              </Avatar>
            }
            title={data ? <h2>{data.name}</h2> : <div>Loading...</div>}
          />
          <CardContent>{data?.description ?? <div>Loading...</div>}</CardContent>
        </Card>

        <Typography variant="h5">Members:</Typography>
        <Grid container>
          {membersData ? (
            membersData.map((member) => (
              <Grid key={member.id} paddingRight={2} paddingBottom={2}>
                <Card>
                  <CardContent>
                    <Stack spacing={2} direction="row" style={{ alignItems: "center" }}>
                      <Avatar src={member.avatar} alt={member.username} />
                      <Typography>{member.username}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No members found</Typography>
          )}
        </Grid>

        {(isMember) && (
          <div>

            <Typography variant="h5">Discussion</Typography>

            <Stack spacing={2}>
              {dummyposts.map((member) => (
                <Card key={member.timestamp}>
                  <CardContent>
                    <Typography variant="subtitle1">
                      <b>{member.title}</b>
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography style={{ fontSize: "0.8rem" }}>{member.user_id} &bull; {member.timestamp} </Typography>
                    </div>
                    <Typography variant="body2">{member.content}</Typography>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={() => setOpenCreatePostDialog(true)}> Create discussion post </Button>
            </Stack>

            <Typography variant="h5">News</Typography>
            <Stack spacing={2}>
              {news.map((member) => (
                <Card key={member.id}>
                  <CardContent>
                    <Typography variant="h5">{member.id}. {member.title}</Typography>
                    <Typography variant="subtitle2">{member.content}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </div>
        )}

        {(!isMember) && (
          <Button > Request to join this group </Button>
        )}


        {isAuthorized && (
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 16, right: 16 + 240 }}
            onClick={() => setOpenCreateGroupDialog(true)}
          >
            <GroupAdd />
          </Fab>
        )}
      </Stack>
    </>
  );
}

interface GroupData {
  name: string;
  description: string;
  avatar_url: string;
}

interface Member {
  id: number;
  username: string;
  avatar: string;
}

const news = [
  {
    id: 1,
    title: "Title",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
];

const dummyposts = [
  {
    timestamp: "time",
    title: "Message to all",
    user_id: 1,
    group_id: 1,
    content: "Bob sux",
  },
  {
    timestamp: "stamp",
    title: "Message to John",
    user_id: 2,
    group_id: 1,
    content: "no u",
  },
];
