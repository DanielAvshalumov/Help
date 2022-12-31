import { Box, createStyles, Divider, Grid, Paper, Typography } from "@mui/material";

import react from "react"
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Mental from "./Mental";

const Portal = (props) => {

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
                        </Paper>
                    </Grid>
                </Box>

            </Grid>
        </>
    )
}

export default Portal;