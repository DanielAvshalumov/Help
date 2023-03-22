import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import React from "react"
import { useEffect } from "react";

const Portal = (props) => {

    

    const consolidateDates = () => {
        // Adds emotion data to a hashmap to consolidate
        let map = new Map()
        props.data.map(item => {
            if(!map.has(item.date)) {
                map.set(item.date,[item.rate]);
            } else {
                map.get(item.date).push(item.rate);
            }
        })
        let aux = [];
        // Displays average emotion/mood scale per day 
        for(let key of map.keys()) {
            let avgRate = 0
            let numOfEntries = 0;
            map.get(key).forEach(ele => {
                avgRate += ele;
                numOfEntries++;
            });
            aux.push(key+": "+(avgRate/numOfEntries).toFixed(2));
        }
        return aux;
    }
    // Emotion preview element
    const emotionPreview = consolidateDates().map((item,key) => (<Typography key={key} textAlign="center">{item}</Typography>))
    
    useEffect(() => {
        props.updateData();
        console.log(props.data);
    },[]);

    return (
        <>
            <Grid container display="flex" flexDirection="column">
                <Grid item mb={4}>
                    <Typography align="center" variant="h3">Welcome to your page, {props.userLogged.name}</Typography>
                </Grid>

                <Box display="flex" justifyContent={"space-evenly"}>
                    <Grid item>
                        <Paper elevation={17} onClick={props.goTo.mental} sx= {{"&:hover":{cursor:"pointer"}, "padding":1, "backgroundColor":"transparent", "opacity":0.8, "borderRadius":3}}>
                            <Typography variant="h4">Mental Health</Typography>
                            <Divider></Divider>
                        </Paper>
                    </Grid>
                    <Grid item ml={4}>
                        <Paper elevation={17} onClick={props.goTo.physical} sx= {{"&:hover":{cursor:"pointer"},"padding":1,"backgroundColor":"transparent", "opacity":0.8, "borderRadius":3}}>
                            <Typography variant="h4">Physical Health</Typography>
                            <Divider></Divider>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={17} onClick={props.goTo.emotion} sx= {{"&:hover":{cursor:"pointer"}, "padding":1, "backgroundColor":"transparent", "opacity":0.8, "borderRadius":3}}>
                            <Typography variant="h4">Emotional Health</Typography>
                            <Divider/>
                            {emotionPreview}
                        </Paper>
                    </Grid>
                </Box>

            </Grid>
        </>
    )
}

export default Portal;