import TextField from "@mui/material/TextField";
import {Button, Card, Container, Divider, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {User} from "../services/types";
import {useAuth} from "../hooks/useAuth.tsx";
import {useLogin} from "../services/auth.ts";
import {Loader} from "../components/Loader.tsx";

export default function LoginPage() {
    const {state} = useLocation()

    const [username, setUsername] = useState<string>(state?.username || "")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<User>()

    const {isAuthorized, setToken, getToken} = useAuth()
    const _user: User | undefined = getToken() ? JSON.parse(atob(getToken()!.split('.')[1])) : undefined;

    const {data, status, error} = useLogin(user)

    if (isAuthorized) return <Navigate to={`/profile/${_user?.userId}`}/>

    if (status === "pending" && user) return (<Loader/>)

    if (status === "error" && user) {
        console.log(error?.message, {variant: "error"})
        setUser(undefined)
    }

    if (status === "success" && user) {
        if (data.token != null) setToken(data.token)
        setUser(undefined)
        console.log(`Welcome back ${user.username}`, {variant: "info"})
    }

    function loginUser(username: string, password: string) {
        if (username.trim() === "" || password.trim() === "") {
            console.log("Some fields is empty", {variant: "warning"})
            return
        }

        setUser({
            id: data?.user.id,
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
                        <Button variant="contained" sx={{flexGrow: 9}}
                                onClick={() => loginUser(username, password)}>Login</Button>
                        <Button color="inherit" variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/register">Register</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}