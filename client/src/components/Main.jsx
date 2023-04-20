import react, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import UserService from "../services/UserService";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Home from "./Home";
import Navigator from "./Navigator"
import { Divider, Typography } from "@mui/material";

import styles from "../index.css";

function Main(props) {

    // !! Currently does not work if user doesn't stay signed in
    //    Will get around to that sometime 

    const nav = useNavigate();
    const [incorrectMessage,setIncorrectMessage] = useState("");


    useEffect(()=>{
        if(props.userLogged === false) {
            nav("login");
        } else {
            nav("home/portal");
        }
    },[props.userLogged]);

    
    //Handles Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        const {checked} = e.target.logCheck;
        const newRes = await UserService.authSignIn({username:name,password:password},checked);
        if(newRes) {
            props.setUserLogged(() => ({name:name}))
        } else {
            setIncorrectMessage("Username and/or password is incorrect");
        }
        
    }
    

 
    return (
        <>
            <Navigator
                userLogged={props.userLogged}
                setUserLogged={props.setUserLogged}
            />
            <Typography mt={3} variant="h2" textAlign="center" fontFamily={"NewYork"}>Help</Typography>
            <Divider textAlign="center" sx={{margin:"30px 200px"}} />
            <Routes>
                <Route path="/login" element={<LogIn 
                    incorrectMessage={incorrectMessage}
                    setIncorrectMessage={setIncorrectMessage}
                    handleSubmit={handleSubmit}/>}
                />
                <Route path="/signup" element={<SignUp setIncorrectLogInMessage={setIncorrectMessage}/>} />
                <Route path="/home/*" element={<Home userLogged={props.userLogged}/>} />
            </Routes>
            
        </>
    )
}

export default Main;