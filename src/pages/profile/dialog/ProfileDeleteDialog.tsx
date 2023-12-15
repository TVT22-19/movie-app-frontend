import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {ProfileDeleteDialogProps} from "./types.ts";
import {useDeleteUser} from "../../../services/users.ts"
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

export default function ProfileDeleteDialog(props: ProfileDeleteDialogProps) {

    const deleteUserMutation = useDeleteUser()

    const navigate = useNavigate()

    const {setToken} = useAuth()

    if (deleteUserMutation.isError) console.log(deleteUserMutation.error)

    function afterDeletion() {
        props.setOpen(false)
        setToken("")
        navigate("/")
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Are you sure you want to delete your user?</DialogTitle>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => deleteUserMutation.mutate((props.user.id!), {
                    onSuccess: () => console.log("User deleted"),
                    onSettled: () => afterDeletion()
                })} autoFocus color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}