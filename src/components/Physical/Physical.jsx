import { Divider, Grid, Typography, Box } from "@mui/material";
import React, { useReducer, useState, useEffect } from "react"
import axios from "axios";
import PhysicalService from "../../services/PhysicalService";


function reducer(physical, action) {
    switch (action.type) {
        case("on-load"): {
            let info = action.payload;
            return {
                info
            };
        }
        case("update-calories"): {

        }
        case("add-meal"): {
            
        }
        default:return physical;
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
    const [firstUse, setFirstUse] = useState(false);
    
    const getInitialPhysical = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id
        const response = await PhysicalService.getPhysical(id)
                .then((res) => {
                    console.log(res.data);
                    if(!res.data) {
                        setFirstUse(true);
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
    },[]);

    return (
        <React.Fragment>

            { firstUse ? <PhysicalConfigPage/> :
            
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

            }
            
        </React.Fragment>
    )
}

const PhysicalConfigPage = () => {



    return (
        <>
            <Typography variant="h1">Hey</Typography>
        </>
    )
}

export default Physical;