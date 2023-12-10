import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
//import { useRemoveMember } from "../groupqueries";
import { RemoveMemberDialogProps } from "./types";



const RemoveMemberDialog = (props: RemoveMemberDialogProps) => {
   
    const handleRemoveConfirm = () => {
      
      //
    };
  
    const handleRemoveCancel = () => {
      props.onClose();
    };
  
    return (
      <Dialog open={props.open} onClose={handleRemoveCancel}>
        <DialogTitle>{`Remove user with id: ${props.selectedUserId} from the group?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleRemoveCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default RemoveMemberDialog;
  