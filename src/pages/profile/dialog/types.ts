import {Dispatch} from "react";
import { User } from "../../../services/types";

export interface ProfileEditDialogProps {
    open: boolean,
    setOpen: Dispatch<boolean>,
    user: User
}