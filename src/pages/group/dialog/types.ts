import {Dispatch} from "react";

export interface CreatePostDialogProps {
    open: boolean,
    setOpen: Dispatch<boolean>
}

export interface RemoveMemberDialogProps {
    open: boolean;
    selectedUserId: number | null;
    groupId: number;
    onClose: () => void;
  }