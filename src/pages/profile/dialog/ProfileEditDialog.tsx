import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useState} from "react"
import {ProfileEditDialogProps} from "./types.ts";
import {User} from "../../../services/types.ts"
import {useUpdateUser} from "../../../services/users.ts"
import {useAuth} from "../../../hooks/useAuth.tsx";

export default function ProfileEditDialog(props: ProfileEditDialogProps) {

    const [user, setUser] = useState<User>()

    const [username, setUsername] = useState<string>(props.user.username || "")
    const [password, setPassword] = useState<string>(props.user.password || "")
    const [age, setAge] = useState<number>(props.user.age || 0)
    const [firstname, setFirstname] = useState<string>(props.user.firstname || "")
    const [lastname, setLastname] = useState<string>(props.user.lastname || "")
    const [avatarURL, setAvatarURL] = useState<string>(props.user.avatarURL || "")

    const {data, status, error} = useUpdateUser(user)

    const {setToken} = useAuth()

    if (status === "pending" && user) return (<h1>Loading...</h1>)

    if (status === "error" && user) console.log(error.message, {variant: "error"})

    if (status === "success" && user) {
        if (data.token != null) setToken(data.token)
        console.log("Updated successfully!")
    }

    function updateUser(username: string, password: string, age: number, firstname: string, lastname: string, avatarURL: string) {
        setUser({
            id: props.user.id,
            username: username,
            password: password,
            registration_date: props.user.registration_date,
            age: age,
            firstname: firstname,
            lastname: lastname,
            avatarURL: avatarURL
        })

        props.setOpen(false)
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Profile Edit</DialogTitle>
            <DialogContent>
                <Stack spacing={2} paddingY={1}>
                    <TextField label="Username" variant="outlined"
                               onChange={(event) => setUsername(event.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password"
                               onChange={(event) => setPassword(event.target.value)}/>
                    <TextField label="Age" variant="outlined"
                               onChange={(event) => setAge(Number(event.target.value))}/>
                    <TextField label="Firstname" variant="outlined"
                               onChange={(event) => setFirstname(event.target.value)}/>
                    <TextField label="Lastname" variant="outlined"
                               onChange={(event) => setLastname(event.target.value)}/>
                    <TextField label="Avatar URL" variant="outlined"
                               onChange={(event) => setAvatarURL(event.target.value)}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button variant="contained"
                        onClick={() => updateUser(username, password, age, firstname, lastname, avatarURL)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}