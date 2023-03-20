import { Divider, Grid, Typography, Box, TextField, Fade, Button } from "@mui/material";
import React, { useReducer, useState, useEffect, useRef } from "react"
import PhysicalService from "../../services/PhysicalService";
import { useNavigate } from "react-router-dom";


function reducer(physical, action) {
    switch (action.type) {
        case("on-load"): 
           return {
            ...physical,
            calories: action.payload.calories,
            protein: action.payload.protein,
            carbs: action.payload.carbs,
            fat: action.payload.fat
           }
        case("update-calories"): 

        
        case("add-meal"): 
            
        
        default:
            return physical;
    }
}

const Physical = () => {

    const physicalState = {
        calories : 0,
        protein: 0,
        carbs: 0,
        fat: 0,
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
    const [loading, setLoading] = useState(false);
    const [firstUse, setFirstUse] = useState(true);
    const [physical, dispatch] = useReducer(reducer, physicalState);
    const calorieRef = useRef();
    const nav = useNavigate();

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
                    if(!res.data) {
                        setFirstUse(false);
                    } else {
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
                <TextField placeholder="Calories" sx={{ marginTop:3 }} inputRef={calorieRef} />
                <TextField type={"number"} placeholder="Protein" sx={{ marginTop:3 }}/>
                <TextField type={"number"} placeholder="Carbs" sx={{ marginTop:3 }} />
                <TextField type={"number"} placeholder="Fat" sx={{ marginTop:3 }} />
                <Button variant="contained" type="submit" sx={{ marginTop:3 }}>Submit</Button>
            </Box>
        </>
    );

    return (
        <React.Fragment>

            { !firstUse ? <Fade in={!firstUse} timeout={4000}><form onSubmit={handleSubmit} ref={calorieRef}>{PhysicalConfigPage}</form></Fade> :
            
            <Grid container>
                <Grid item md={5}>
                    <Typography variant="h3" textAlign="center">Macros</Typography>
                    <Box display={"flex"} mt={3}>
                        <Box ml={15}>
                            Current:
                        </Box>
                        <Box ml={15}>
                            Goal:  {physical.calories}
                        </Box>
                        <Box ml={15}>
                            Left
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item md={6}>
                    <Typography variant="h3" textAlign="center">Meals</Typography>
                </Grid>
            </Grid>

            }
            
        </React.Fragment>
    )
}






export default Physical;