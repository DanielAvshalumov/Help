import { Divider, Grid, Typography, Box, TextField, Fade, Button } from "@mui/material";
import React, { useReducer, useState, useEffect, useRef } from "react"
import { Link, Route, Routes } from "react-router-dom";
import PhysicalService from "../../services/PhysicalService";
import AddMeal from "./AddMeal";

function reducer(physical, action) {
    switch (action.type) {
        case("on-load"): 
           return {
            ...physical,
            goal: 
            {
                calories:action.payload.calories,
                protein: action.payload.protein,
                carbs: action.payload.carbs,
                fat: action.payload.fat
            }
           }
        case("update-calories"): 

        
        case("add-meal"): 
            
        
        default:
            return physical;
    }
}

const Physical = () => {

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
    const [firstUse, setFirstUse] = useState(true);
    const [physical, dispatch] = useReducer(reducer, physicalState);
    const calorieRef = useRef();

    const handleSubmit = async (e) => {
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
        const id = JSON.parse(localStorage.getItem("user")).id
        const response = await PhysicalService.getPhysical(id)
                .then((res) => {
                    console.log(res.data);
                    if(res.data) {
                        setFirstUse(false);
                        dispatch({type:"on-load",payload:res.data})
                    }
                }).catch((error) => {
                    console.log("didn't work",error);
                });
    }

    useEffect(() => {
        getInitialPhysical();
        console.log(physical);
        console.log(firstUse);
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

            { firstUse ? <Fade in={firstUse} timeout={4000}><form onSubmit={handleSubmit} ref={calorieRef}>{PhysicalConfigPage}</form></Fade> :
            
            <Grid container>
                <Grid item md={5}>
                    <Typography variant="h3" textAlign="center">Macros</Typography>
                    <Box display={"flex"} mt={3}>
                        <Box display="flex" flexDirection={"column"} ml={12}>
                            <Typography variant="h4">Current</Typography>
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
                            <Typography variant="h4">Left</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.calories}</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.protein}</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.carbs}</Typography>
                            <Typography variant="h5" mt={4}>{physical.current.fat}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item textAlign={"center"} md={8} lg={6}>
                    <Typography variant="h3" textAlign="center">Meals</Typography>
                    <Link to="/home/physical/addmeal">
                        <Button variant="contained" sx={{ mt:3 }}>Add a meal</Button>
                    </Link>
                </Grid>
            </Grid>
            }
            {/* create two paths, one for meal selection and one for meal additions */}
            <Routes path="/">
                <Route path="addmeal" element={<AddMeal/>} />
            </Routes>
        </React.Fragment>
    )
}






export default Physical;