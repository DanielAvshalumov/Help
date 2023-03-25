import React, { useReducer } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Emotion from "./Emotion/Emotion";
import Mental from "./Mental";
import Portal from "./Portal";
import EmotionService from "../services/EmotionService";
import Physical from "./Physical/Physical";
import AddMeal from "./Physical/AddMeal";
import PhysicalService from "../services/PhysicalService";

const Home = (props) => {
    const physicalState = {
        goal:{
            calories : 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        current: {
            calories : 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        meals: [
            {
                mealName: "",
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            }  
        ]
    }
    
    const [data,setData] = useState([]);
    const [physical, dispatch] = useReducer(reducer, physicalState);

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
        nav("physical/meal");
    }
    
    return (
        <>
            <Routes>
                <Route path="portal" element={<Portal userLogged={props.userLogged} goTo={{mental:goToMental,emotion:goToEmotion,physical:goToPhysical}} data={data} updateData={updateData}/>}></Route>
                <Route path="mental" element={<Mental/>}/>
                <Route path="emotion" element={<Emotion data={data} />}/>
                <Route path="physical/*" element={<Physical physical={physical} dispatch={dispatch}/>} />
            </Routes>
        </>
    );
}

function reducer(physical, action) {
    switch (action.type) {
        case("on-load"): 
           return {
                ...physical,
                goal: 
                {
                    calories: action.payload.calories,
                    protein: action.payload.protein,
                    carbs: action.payload.carbs,
                    fat: action.payload.fat
                }
           }
        case("load-meals"): 
           return {
                ...physical,
                meals: action.payload
           }
        case('add-meal'): 
            return {
                ...physical,
                meals:
                [...physical.meals,
                    {
                        id:action.payload.id,
                        mealName:action.payload.mealName,
                        calories: action.payload.calories,
                        protein: action.payload.protein,
                        carbs: action.payload.carbs,
                        fat : action.payload.fat
                    }
                ]
            }
        case('eat'):
            return {
                ...physical,
                current: {
                    calories: physical.current.calories + action.payload.calories,
                    protein: physical.current.protein + action.payload.protein,
                    carbs: physical.current.carbs + action.payload.carbs,
                    fat: physical.current.fat + action.payload.fat
                }
            }
        case('remove-meal'):
            const meal = physical.meals.filter(item => (item.id !== parseInt(action.payload)));
            return {
                ...physical,
                meals:meal
            }
        default:
            return physical;
    }
}

export default Home;