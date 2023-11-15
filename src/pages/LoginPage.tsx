import TextField from "@mui/material/TextField";
import {Button, Card, Container, Divider, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {User} from "../services/types";

export default function LoginPage() {
    const {state} = useLocation()

    const [username, setUsername] = useState<string>(state?.username || "")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<User>()

    function loginUser(username: string, password: string) {
        setUser(undefined)

        if (username.trim() === "" || password.trim() === "") {
            console.log("Some fields is empty")
            return
        }

        setUser({
            username: username,
            password: password
        })
    }

    return (
        <Container maxWidth="xs">
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">Log In</Typography>
                    <TextField label="Username" variant="outlined" type="text" defaultValue={state?.username || ""}
                               onChange={(event) => setUsername(event.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password"
                               onChange={(event) => setPassword(event.target.value)}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button color="inherit" variant="contained" sx={{flexGrow: 9}}
                                onClick={() => loginUser(username, password)}>Login</Button>
                        <Button color="inherit" variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/register">Register</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}