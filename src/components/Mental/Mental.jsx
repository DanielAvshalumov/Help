import { Box, Button, Grid, Typography } from "@mui/material";
import react, { useEffect, useState } from "react";
import ClockGraph from "./ClockGraph";
import ActivityList from "./ActivityList";
import MentalService from "../../services/MentalService";

const Mental = () => {

    const [activity, setActivity] = useState({
        name: "",
        type: "",
        duration: 0,
        goal: 0,
        checked: false,
        ongoing: false,
        notes:["",],
    });
    const [loading, setLoading] = useState(true);

    const getInitialActivities = async () => {
        setLoading(true);
        const id = JSON.parse(localStorage.getItem("user")).id;
        const res = await MentalService.getAllActivity(id);
        setActivity((prev) => (res.data.map(item => ({
            ...prev,
            name: item.name,
            type: item.type,
            goal: item.goal
        }))));
        setLoading(false);
    }
    
    useEffect(() =>  {
        getInitialActivities();
        console.log(activity);
    },[])
    
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
                        <ActivityList activity={activity} loading={loading}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Mental;