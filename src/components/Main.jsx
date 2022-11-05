import react, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import UserService from "../services/UserService";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Home from "./Home";
import Navigator from "./Navigator"
import { Divider, Typography } from "@mui/material";

function Main(props) {

    const nav = useNavigate();
    const location = useLocation();
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
        // Input: User Name
        const {value} = e.target.name;
        const newRes = await UserService.getUserByUserName(value);
        let exists = newRes;
        console.log(exists);
        //Verifies UserName
        if(exists.data !== '') {
            let expectedPassword = newRes.data.password;
            const inputPassword = e.target.password.value;
            // Verifies Password
            if(inputPassword === expectedPassword) {
                console.log("logged in");
                props.setUserLogged(()=>({name:value}));
                // Check if user wants to stay logged in
                const { checked } = e.target.logCheck;
                if(checked === true) {
                    //TODO: handle persistent login -- Cookies 
                }
            } else {
                setIncorrectMessage("Incorrect Password");
            }
        } else {
            setIncorrectMessage("Username not found");
        }
    }
    

 
    return (
        <>
            <Navigator
                userLogged={props.userLogged}
                setUserLogged={props.setUserLogged}
            />
            <Typography mt={3} variant="h2" textAlign="center">Help</Typography>
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