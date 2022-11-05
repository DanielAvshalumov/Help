import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Portal from "./Portal";

const Home = (props) => {
    const [userData,setUserData] = useState(props.userLogged);
    return (
        <>
            <Routes>
                <Route path="/portal" element={<Portal userData={userData}/>}></Route>
            </Routes>
        </>
    );
}

export default Home;