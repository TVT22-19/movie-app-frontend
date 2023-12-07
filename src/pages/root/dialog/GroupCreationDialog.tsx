import TextField from "@mui/material/TextField";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";
import {CreateGroupDialogProps} from "./types.ts";


export default function GroupCreationDialog(props: CreateGroupDialogProps) {

    const [groupName, setGroupName] = useState<string>("")
    const [groupDescription, setGroupDescription] = useState<string>("")
    const [groupAvatar, setGroupAvatar] = useState<string>("")

    function createGroup(groupname: string, groupdesc: string, groupavatar: string) {

        if (groupname.trim() === "" || groupdesc.trim() === "") {
            console.log("Some required fields are empty")
            return
        }

        if (groupavatar.trim() !== "" && !fetch(groupavatar).then(response => response.headers.get("Content-Type")?.includes("image"))) {
            console.log("Incorrect avatar url")
            return
        }

        //If all success
        props.setOpen(false)

        // Q: Limit description length?
        // A: No...
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
            <DialogTitle>
                Create new group
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} paddingY={1}>
                    <TextField label="Group name" variant="outlined" type="text"
                               onChange={(event) => setGroupName(event.target.value)}/>
                    <TextField label="Group description" variant="outlined" type="text" multiline rows={4}
                               onChange={(event) => setGroupDescription(event.target.value)}/>
                    <TextField label="Group avatar URL (optional)" variant="outlined" type="text"
                               onChange={(event) => setGroupAvatar(event.target.value)}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button autoFocus variant="contained"
                        onClick={() => createGroup(groupName, groupDescription, groupAvatar)}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}