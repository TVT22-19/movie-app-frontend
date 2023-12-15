import {Dispatch} from "react";

export interface CreatePostDialogProps {
    open: boolean,
    setOpen: Dispatch<boolean>,
    handleCreatePost: (title: string, content: string) => void
}

export interface RemoveMemberDialogProps {
    open: boolean;
    selectedUserId: number | null;
    groupId: number;
    onClose: () => void;
  }