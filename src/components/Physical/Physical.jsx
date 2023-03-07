import { Divider, Grid, Typography, Box } from "@mui/material";
import React, {  } from "react"


function reducer(physical, action) {
    switch (action.type) {
        case(""): {

        }
        case(9): {
            
        }
    }
}

const Physical = () => {

    const state = {
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
    const [physical, dispatch] = useReducer(reducer, state);

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