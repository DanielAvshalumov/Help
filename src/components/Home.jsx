import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Emotion from "./Emotion/Emotion";
import Mental from "./Mental";
import Portal from "./Portal";

const Home = (props) => {
    
    const nav = useNavigate();
    const goToMental = () => {
        nav("mental");
        console.log("cool");
    }
    const goToEmotion = () => {
        nav("emotion");
    }
    return (
        <>
            <Routes>
                <Route path="portal" element={<Portal userLogged={props.userLogged} goTo={{mental:goToMental,emotion:goToEmotion}}/>}></Route>
                <Route path="mental" element={<Mental/>}/>
                <Route path="emotion" element={<Emotion />}/>
            </Routes>
        </>
    );
}

export default Home;