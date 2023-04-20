import { Divider, Grid, Typography, Box, TextField, Fade, Button } from "@mui/material";
import React, { useReducer, useState, useEffect, useRef } from "react"
import { Route, Routes } from "react-router-dom";
import PhysicalService from "../../services/PhysicalService";
import AddMeal from "./AddMeal";
import Meals from "./Meals";

function reducer(physical, action) {
    switch (action.type) {
        case('set-goal'):
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
        case("set-current"): 
           return {
                ...physical,
                current: 
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
                    calories: physical.current.calories - action.payload.calories,
                    protein: physical.current.protein - action.payload.protein,
                    carbs: physical.current.carbs - action.payload.carbs,
                    fat: physical.current.fat - action.payload.fat
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


const Physical = ( { physicalState } ) => {

    
    const [physical, dispatch] = useReducer(reducer, physicalState);

    const [firstUse, setFirstUse] = useState(true);
    const calorieRef = useRef();

    const handleNewPhysical = async (e) => {
        const input = [...calorieRef.current].filter(item => item.value).map(item => item.value);
        const body = {
            calories : input[0],
            protein: input[1],
            carbs: input[2],
            fat: input[3]
        }
        let id = JSON.parse(localStorage.getItem("user")).id;
        const res = await PhysicalService.createPhysical(id,body);
        console.log(res);
    }
    
    const getInitialPhysical = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const response = await PhysicalService.getUserPhysical(id)
                .then((res) => {
                    console.log(res.data);
                    dispatch({type:'set-goal',payload:res.data});
                }).catch((error) => {
                    console.log(error);
                });
    }

    const getPhysical = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const response = await PhysicalService.getPhysical(id)
                .then((res) => {
                    if(res.data) {
                        setFirstUse(false);
                        dispatch({type:"set-current",payload:res.data});
                    }
                }).catch((error) => {
                    console.log("didn't work",error);
                });
    }
    
    const getInitialMeals = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const response = await PhysicalService.getMeals(id)
                .then((res) => {
                    dispatch({type:"load-meals",payload:res.data});
                })
                .catch(error => {
                    console.log(error);
                })
    }

    useEffect(() => {
        getPhysical();
        getInitialMeals();
        getInitialPhysical();
    },[]);

    useEffect(() => {
        console.log(physical);
    },[]);

    const PhysicalConfigPage =  (
        <>
            <Typography variant="h3" textAlign={"center"}>Enter your Macros here</Typography>
            <Box sx={{ display:'flex', flexDirection:'column', alignItems:"center"}}>
                <TextField type={"number"} placeholder="Calories" sx={{ marginTop:3 }} inputRef={calorieRef} />
                <TextField type={"number"} placeholder="Protein" sx={{ marginTop:3 }}/>
                <TextField type={"number"} placeholder="Carbs" sx={{ marginTop:3 }} />
                <TextField type={"number"} placeholder="Fat" sx={{ marginTop:3 }} />
                <Button variant="contained" type="submit" sx={{ marginTop:3 }}>Submit</Button>
            </Box>
        </>
    );

    return (
        <React.Fragment>

            { firstUse ? <Fade in={firstUse} timeout={4000}><form onSubmit={handleNewPhysical} ref={calorieRef}>{PhysicalConfigPage}</form></Fade> :
            
            <Grid container>
                <Grid item md={5}>
                    <Typography variant="h3" textAlign="center">Macros</Typography>
                    <Box display={"flex"} mt={3} mb={5}>
                        <Box display="flex" flexDirection={"column"} ml={12}>
                            <Typography variant="h4">Nutrients</Typography>
                            <Typography variant="h5" mt={4}>Calories</Typography>
                            <Typography variant="h5" mt={4}>Protein</Typography>
                            <Typography variant="h5" mt={4}>Carbs</Typography>
                            <Typography variant="h5" mt={4}>Fat</Typography>
                        </Box>
                        <Box display="flex" flexDirection={"column"} ml={12}>
                            <Typography variant="h4">Goal</Typography>
                            <Typography variant="h5" mt={4}>{physical.goal.calories}</Typography>
                            <Typography variant="h5" mt={4}>{physical.goal.protein}</Typography>
                            <Typography variant="h5" mt={4}>{physical.goal.carbs}</Typography>
                            <Typography variant="h5" mt={4}>{physical.goal.fat}</Typography>
                        </Box>
                        <Box display="flex" flexDirection={"column"} ml={12}>
                            <Typography variant="h4">Current</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.calories}</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.protein}</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.carbs}</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.fat}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                    <Routes>
                    <Route path="/meal" element={<Meals meals={physical.meals} dispatch={dispatch}/>} />
                    <Route exact path="addmeal" element={<AddMeal dispatch={dispatch}/>} />
                </Routes>
            </Grid>
            }
            
        </React.Fragment>
    )
}






export default Physical;