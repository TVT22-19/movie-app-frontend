import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useState} from "react"
import {ProfileDeleteDialogProps} from "./types.ts";

import {User} from "../../../services/types.ts"
import {useUpdateUser} from "../../../services/users.ts"
import {useAuth} from "../../../hooks/useAuth.tsx";

export default function ProfileDeleteDialog(props: ProfileDeleteDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                Are you sure you want to delete your user?
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => props.setOpen(false)} autoFocus color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}