import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {ProfileEditDialogProps} from "./types.ts";

export default function ProfileEditDialog(props: ProfileEditDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                Profile Edit
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} paddingY={1}>
                    <TextField label="Username" variant="outlined"/>
                    <TextField label="Password" variant="outlined"/>
                    <TextField label="Age" variant="outlined"/>
                    <TextField label="Firstname" variant="outlined"/>
                    <TextField label="Lastname" variant="outlined"/>
                    <TextField label="Avatar URL" variant="outlined"/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => props.setOpen(false)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}