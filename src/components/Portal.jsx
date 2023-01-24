import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import React from "react"
import { useEffect } from "react";

const Portal = (props) => {
    
    const emotionPreview = props.data.map((item,key) => (<Typography key={key}>Date:{item.date+"\t"}Rate:{item.rate}</Typography>))
    
    useEffect(() => {
        props.updateData();
    },[]);

    return (
        <>
            <Grid container display="flex" flexDirection="column">
                <Grid item mb={4}>
                    <Typography align="center" variant="h3">Welcome to your page, {props.userLogged.name}</Typography>
                </Grid>

                <Box display="flex" justifyContent={"space-evenly"}>
                    <Grid item>
                        <Paper elevation={5} onClick={props.goTo.mental} sx= {{"&:hover":{cursor:"pointer"}}}>
                            <Typography variant="h4">Mental Health</Typography>
                            <Divider></Divider>
                            
                        </Paper>
                    </Grid>
                    <Grid item ml={4}>
                        <Paper elevation={5} sx= {{"&:hover":{cursor:"pointer"}}}>
                            <Typography variant="h4">Physical Health</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={5} onClick={props.goTo.emotion} sx= {{"&:hover":{cursor:"pointer"}}}>
                            <Typography variant="h4">Emotional Health</Typography>
                            {emotionPreview}
                        </Paper>
                    </Grid>
                </Box>

            </Grid>
        </>
    )
}

export default Portal;