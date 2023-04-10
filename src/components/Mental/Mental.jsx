import { Box, Button, Grid, Typography } from "@mui/material";
import react, { useState } from "react";
import ClockGraph from "./ClockGraph";
import ActivityList from "./ActivityList";

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

    
    return (
        <>
            <Box>
                <Grid container display="flex" justifyContent="space-around" ml={-6}>
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