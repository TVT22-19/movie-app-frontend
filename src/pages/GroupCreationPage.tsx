import TextField from "@mui/material/TextField";
import {Button, Card, Container, Divider, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";


export default function LoginPage() {
    const {state} = useLocation()

    const [groupname, setGroupname] = useState<string>("")
    const [groupdesc, setGroupDescription] = useState<string>("")
   

   

    function createGroup(groupname: string, groupdesc: string) {
        

        if (groupname.trim() === "" || groupdesc.trim() === "") {
            console.log("Some fields are empty")
            return
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

                    <Button variant="contained" sx={{flexGrow: 9}}
                                onClick={() => createGroup(groupname, groupdesc)}>Create</Button>
                        
                </Stack>
            </Card>
        </Container>
    )
}