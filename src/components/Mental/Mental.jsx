import { Box, Button, Grid, Typography } from "@mui/material";
import react, { useState } from "react";
import ClockGraph from "./ClockGraph";
import ActivityList from "./ActivityList";
import MentalService from "../../services/MentalService";

const Mental = () => {

    const [activity, setActivity] = useState([{
        name: "",
        type: "",
        duration: 0,
        goal: 0,
        checked: false,
        ongoing: false,
        notes:["",],
    }]);    

    const getInitialActivities = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const body = {};
        const res = await MentalService.createActivity(id, body);
        setActivity();
    }
    
    return (
        <>
            <Box>
                <Grid container display="flex" justifyContent="space-around" ml={-1}>
                    <Grid item>
                        <Typography variant="h3">{new Date().toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item>
                        <ClockGraph />
                    </Grid>
                    <Grid item>
                        <ActivityList activity={activity} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Mental;