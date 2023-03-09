import { Divider, Grid, Typography, Box } from "@mui/material";
import React, { useReducer, useState, useEffect } from "react"
import axios from "axios";
import PhysicalService from "../../services/PhysicalService";


function reducer(physical, action) {
    switch (action.type) {
        case("on-load"): {
            return {
                
            }
        }
        case("update-calories"): {

        }
        case("add-meal"): {
            
        }
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
    const [physical, dispatch] = useReducer(reducer, physicalState);
    const getInitialPhysical = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id
        const res = await axios.get(`http://localhost:8080/api/physical/${id}`,{headers:{'Content-Type':'application/json'}});
        dispatch({
            type: "on-load",
            payload: res.data
        });
    }

    const checkFunction = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const res = await PhysicalService.getPhysical(id);
        console.log(res);
    }
    

    useEffect(() => {
        getInitialPhysical();
        checkFunction();
    },[]);

    return (
        <React.Fragment>
            
            <Grid container>
                <Grid item md={5}>
                    <Typography variant="h3" textAlign="center">Macros</Typography>
                    <Box display={"flex"} mt={3}>
                        <Box ml={15}>
                            Current
                        </Box>
                        <Box ml={15}>
                            Goal
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
            
        </React.Fragment>
    )
}

export default Physical;