import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRemoveMember } from "../groupqueries";
import { RemoveMemberDialogProps } from "./types";
import { UserRemovalBody } from "../types";


const RemoveMemberDialog = (props: RemoveMemberDialogProps) => {

  const removeUserMutation = useRemoveMember();
   
  const handleRemoveCancel = () => {
      props.onClose();
      //does anything else need to be done
    };
  
    return (
      <Dialog open={props.open} onClose={handleRemoveCancel}>
        <DialogTitle>{`Remove user with id: ${props.selectedUserId} from the group?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleRemoveCancel} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={() => {
                    removeUserMutation.mutate({
                      selectedUserId: props.selectedUserId,
                      groupId: props.groupId,

                    } as UserRemovalBody, {
                        onSuccess: () => console.log("User removed"),
                        onSettled: () => handleRemoveCancel()
                    })
                }} autoFocus color="error">
                    Remove
                </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default RemoveMemberDialog;
  