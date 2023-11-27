import TextField from "@mui/material/TextField";
import {Button, Card, Container, Stack, Typography} from "@mui/material";
import {useState} from "react";


export default function LoginPage() {
   
    const [groupname, setGroupname] = useState<string>("")
    const [groupDescription, setGroupDescription] = useState<string>("")
    const [groupAvatar, setGroupAvatar] = useState<string>("")


    function createGroup(groupname: string, groupdesc: string, groupavatar: string) {
        

        if (groupname.trim() === "" || groupdesc.trim() === "") {
            console.log("Some required fields are empty")
            return //
        }
        //limit description length?

    }

    return (
        <Container maxWidth="xs"> 
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">Create New Group</Typography>
                    <TextField label="Group name" variant="outlined" type="text"
                               onChange={(event) => setGroupname(event.target.value)}/>
                    <TextField label="Group description" variant="outlined" type="text" multiline rows={4}
                               onChange={(event) => setGroupDescription(event.target.value)}/>
                    <TextField label="Group avatar URL (optional)" variant="outlined" type="text"
                               onChange={(event) => setGroupAvatar(event.target.value)}/>

                    <Button variant="contained" sx={{flexGrow: 9}}
                                onClick={() => createGroup(groupname, groupDescription, groupAvatar)}>Create</Button>
                        
                </Stack>
            </Card>
        </Container>
    )
}

//maybe the card should be wider