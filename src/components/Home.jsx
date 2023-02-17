import React from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Emotion from "./Emotion/Emotion";
import Mental from "./Mental";
import Portal from "./Portal";
import EmotionService from "../services/EmotionService";
import Physical from "./Physical/Physical";


const Home = (props) => {
    
    const [data,setData] = useState([]);
    const updateData = () => {
        let mounted = true
        let id = JSON.parse(localStorage.getItem("user")).id;

        EmotionService.getAllEmotions(id).then((payload) => {
            if(mounted) {
                setData(payload.data);
            }
        });

        return () => {
            mounted = false;
        }
    }

    const nav = useNavigate();
    const goToMental = () => {
        nav("mental");
    }
    const goToEmotion = () => {
        nav("emotion");
    }
    const goToPhysical = () => {
        nav("physical");
    }
    
    return (
        <>
            <Routes>
                <Route path="portal" element={<Portal userLogged={props.userLogged} goTo={{mental:goToMental,emotion:goToEmotion,physical:goToPhysical}} data={data} updateData={updateData}/>}></Route>
                <Route path="mental" element={<Mental/>}/>
                <Route path="emotion" element={<Emotion data={data}/>}/>
                <Route path="physical" element={<Physical />} />
            </Routes>
        </>
    );
}

export default Home;