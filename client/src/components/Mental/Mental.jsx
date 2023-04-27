import { Box, Button, Grid, Typography, Checkbox, CircularProgress } from "@mui/material";
import react, { useEffect, useState } from "react";
import ClockGraph from "./ClockGraph";
import ActivityList from "./ActivityList";
import MentalService from "../../services/MentalService";

const Mental = () => {

    const [activity, setActivity] = useState({
        name: "",
        type: "",
        goal: 0,
        duration: 0,
        checked: false,
        ongoing: false,
        notes:["",],
    });
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState(0);

    const getInitialActivities = async () => {
        setLoading(true);
        const id = JSON.parse(localStorage.getItem("user")).id;
        const res = await MentalService.getAllActivity(id);
        setActivity((prev) => (res.data.map(item => ({
            ...prev,
            id: item.id,
            name: item.name,
            type: item.type,
            goal: item.goal
        }))));
        setLoading(false);
    }

    const activateActivity = (e) => {
        let buttonText = e.target.innerText;
        console.log(buttonText === "START");
        e.target.innerText = e.target.innerText === "START" ? "STOP" : "START";

    }

    useEffect(() =>  {
        getInitialActivities();
        console.log(activity);
    },[])

    
    const checklistElement = () => {
        const el = activity.map((item,key) => (
            <>
                <Box key={key} display="flex" alignItems="center">
                    <Checkbox disabled/>
                    <Typography>{item.name+'\t'} - Goal - {item.goal}</Typography>
                </Box>
            </>
        ));
        return el;
    }
    
    return (
        <>
            <Box>
                <Grid container display="flex" justifyContent="space-around" ml={-1}>
                    <Grid item>
                        <Typography variant="h3">{new Date().toLocaleDateString()}</Typography>
                        { loading ? <CircularProgress /> : checklistElement()}

                    </Grid>
                    <Grid item>
                        <ClockGraph outterarc={0}/>
                    </Grid>
                    <Grid item>
                        <ActivityList activity={activity} loading={loading} setActivity={setActivity} activateActivity={activateActivity}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Mental;