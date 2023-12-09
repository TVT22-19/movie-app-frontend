import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRemoveMember } from "../groupqueries";


interface RemoveMemberDialogProps {
    open: boolean;
    selectedUserId: number;
    groupId: number;
    onClose: () => void;
  }
  
  const RemoveMemberDialog: React.FC<RemoveMemberDialogProps> = ({ open, selectedUserId, groupId, onClose }) => {
    const removeMemberQuery = useRemoveMember(selectedUserId, groupId);
  
    const handleRemoveConfirm = () => {
      
      removeMemberQuery.refetch();
    };
  
    const handleRemoveCancel = () => {
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={handleRemoveCancel}>
        <DialogTitle>{`Remove user with id: ${selectedUserId} from the group?`}</DialogTitle>
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
  