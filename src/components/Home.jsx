import React from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Emotion from "./Emotion/Emotion";
import Mental from "./Mental";
import Portal from "./Portal";
import EmotionService from "../services/EmotionService";
import Physical from "./Physical/Physical";
import AddMeal from "./Physical/AddMeal";


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

        //TODO: change data state to include physical 

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
        nav("physical/meal");
    }
    
    return (
        <>
            <Routes>
                <Route path="portal" element={<Portal userLogged={props.userLogged} goTo={{mental:goToMental,emotion:goToEmotion,physical:goToPhysical}} data={data} updateData={updateData}/>}></Route>
                <Route path="mental" element={<Mental/>}/>
                <Route path="emotion" element={<Emotion data={data} updateData={updateData}/>}/>
                <Route path="physical/*" element={<Physical />} />
            </Routes>
        </>
    );
}

export default Home;