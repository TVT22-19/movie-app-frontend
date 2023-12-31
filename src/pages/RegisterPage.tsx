import {Button, Card, Container, Divider, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {User} from "../services/types";
import {useAuth} from "../hooks/useAuth.tsx";
import {useRegistration} from "../services/auth.ts";
import {Loader} from "../components/Loader.tsx";

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [user, setUser] = useState<User>()

    const navigate = useNavigate()

    const {isAuthorized} = useAuth()
    if (isAuthorized) navigate("/profile")

    const {data, status, error} = useRegistration(user)

    if (status === "pending" && user) return (<Loader/>)

    if (status === "error" && user) {
        console.log(error?.message, {variant: "error"})
        setUser(undefined)
    }

    if (status === "success" && user) {
        console.log(data.message, {variant: "success"})
        navigate("/login", {state: {username: username}})
        setUser(undefined)
    }

    function registerUser(username: string, password: string, passwordRepeat: string) {
        if (username.trim() === "" || password.trim() === "") {
            console.log("Some fields is empty", {variant: "warning"})
            return
        }

        if (password !== passwordRepeat) {
            console.log("Password doesn't match", {variant: "warning"})
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
                    <Typography variant="h4" align="center">Register</Typography>
                    <TextField label="Username" variant="outlined" type="text"
                               onChange={event => setUsername(event.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password"
                               onChange={event => setPassword(event.target.value)}/>
                    <TextField label="Password repeat" variant="outlined" type="password"
                               onChange={event => setPasswordRepeat(event.target.value)}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button variant="contained" sx={{flexGrow: 9}}
                                onClick={() => registerUser(username, password, passwordRepeat)}>Register</Button>
                        <Button color="inherit" variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/login">Login</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}