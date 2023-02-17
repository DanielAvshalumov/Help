import { Divider, Grid, Paper, Typography, Box } from "@mui/material";
import React, { useEffect } from "react"

const Physical = () => {


    return (
        <React.Fragment>
            
            <Grid container>
                <Grid item md={5} >
                    <Typography variant="h3" textAlign="center">Macros</Typography>

                    <Box>
                        Current
                    </Box>
                    <Box>
                        Current
                    </Box>
                    
                </Grid>
                <Divider orientation="vertical" flexItem  />
                <Grid item md={6}>
                    <Typography variant="h3" textAlign="center">Meals</Typography>
                </Grid>
            </Grid>
            
        </React.Fragment>
    )
}

export default Physical;