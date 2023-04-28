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
    const [flag, setFlag] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    
    const startActivity = (e) => {
        console.log(e.target.innerText);
        e.target.innerText = e.target.innerText === "START" ? "STOP" : "START";
        if(!flag) {
            let num = setInterval(() => {setDuration(prev=>(prev+=0.1))},100);
            setIntervalId(num);
            setFlag(true);
            console.log(duration);
        } else {
            const body = activity.filter(item => item.id === parseInt(e.target.value));
            console.log(e.target.value,"body",body);
            clearInterval(intervalId);
            setFlag(false);
        }
    }

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

    useEffect(() =>  {
        getInitialActivities();
        console.log(activity);
    },[])

    const checkListElement = () => {
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
                        { loading ? <CircularProgress disableShrink/> : checkListElement()}

                    </Grid>
                    <Grid item>
                        <ClockGraph duration={duration}/>
                    </Grid>
                    <Grid item>
                        <ActivityList activity={activity} loading={loading} setActivity={setActivity} startActivity={startActivity}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Mental;