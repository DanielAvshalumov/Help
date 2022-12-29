import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import UserService from "../services/UserService";
import react, { useState } from "react"
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignUp(props) {
    const nav = useNavigate();
    const [invalidForm,setInvalidForm] = useState("");
    const [signUpForm,setSignUpForm] = useState({
        id:"",
        username:"",
        password:""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSignUpForm({
            ...signUpForm,
            [name]:value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await UserService.authSignUp(signUpForm)
            .then((response) => {
                console.log(response);
                nav("/login");
            })
            .catch((error) => {
                setInvalidForm("Username or password already taken");
                console.log("error:",error);
            })
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box display={"flex"} flexDirection="column" alignItems="center">
                    <Typography variant="h3" mb={4}>Sign Up</Typography>

                    <Box display={"flex"} flexDirection="column">
                        <TextField name="username" value={signUpForm.username} placeholder="User Name" type="text" onChange={handleChange} autoComplete="off" sx={{ marginBottom:"20px" }}/>
                        <TextField name="password" value={signUpForm.password} placeholder="Password" type="password" onChange={handleChange} sx={{ marginBottom:"20px" }}/>
                    </Box>
                    { signUpForm.username !== "" && signUpForm.password !== "" ?
                    <Button variant="contained" color="primary" type="submit">Submit</Button> :
                    <Button disabled variant="contained" color="primary" type="submit">Submit</Button> }
                    <Typography variant="subtitle1">{invalidForm}</Typography>
                </Box>
            </form>
        </>
    )
}

export default SignUp;

