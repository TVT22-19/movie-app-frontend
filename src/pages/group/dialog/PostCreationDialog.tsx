import TextField from "@mui/material/TextField";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useState} from "react";
import {CreatePostDialogProps} from "./types.ts";

export default function PostCreationDialog(props: CreatePostDialogProps) {

    const [postTitle, setPostTitle] = useState<string>("")
    const [postContent, setPostContent] = useState<string>("")


    function createPost(groupName: string, groupDescription: string) {

        if (groupName.trim() === "" || groupDescription.trim() === "") {
            console.log("Some required fields are empty")
            return;
        }

        props.handleCreatePost(postTitle, postContent);
        props.setOpen(false)
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
            <DialogTitle>Create new post</DialogTitle>
            <DialogContent>
                <Stack spacing={2} paddingY={1}>
                    <TextField label="Post title" variant="outlined" type="text"
                               onChange={(event) => setPostTitle(event.target.value)}/>
                    <TextField label="Write post content here" variant="outlined" type="text" multiline rows={4}
                               onChange={(event) => setPostContent(event.target.value)}/>
                
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button autoFocus variant="contained"
                        onClick={() => createPost(postTitle,postContent)}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}