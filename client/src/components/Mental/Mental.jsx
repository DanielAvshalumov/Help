import { Box, Button, Grid, Typography, Checkbox, CircularProgress } from "@mui/material";
import react, { useEffect, useState } from "react";
import ClockGraph from "./ClockGraph";
import ActivityList from "./ActivityList";
import MentalService from "../../services/MentalService";

const Mental = () => {

    // Should this be changed to use useReducer? 
    const [activity, setActivity] = useState({
        name: "",
        type: "",
        goal: 0,
        ongoing: false,
        notes:["",],
    });
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState(0);
    const [flag, setFlag] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    
    const startActivity = async (e) => {
        const id = parseInt(e.target.value);
        const body = activity.filter(item => item.id === id)[0];
        e.target.innerText = e.target.innerText === "START" ? "STOP" : "START";
        if(!flag) {
            setDuration(body?.today?.reach ?? 0);
            let num = setInterval(() => {setDuration(prev=>(++prev))},1000);
            setIntervalId(num);
            setFlag(true);
        } else {
            console.log(e.target.value,"body",body);
            clearInterval(intervalId);
            setFlag(false);
            const res = body.ongoing ? await MentalService.updateJourney(body.today, duration) : await MentalService.createJourney(id,duration);
            setActivity((prev) => {
                const newActivities = prev.map(item => {
                    if(item.id === id) {
                        return {...item,
                            ongoing:true,
                            today:{...res.data}
                        }
                    }
                    return item;
                });
                return newActivities;
            });
            console.log(id, duration, body.ongoing);
            console.log(res);
        }
    }


    const getInitialActivities = async () => {
        setLoading(true);
        const id = JSON.parse(localStorage.getItem("user")).id;
        const res = await MentalService.getAllActivity(id);
        setActivity((prev) => (res.data.map(item => {
            let entries = item.entries;
            let date = new Date();
            const offset = date.getTimezoneOffset();
            date = new Date(date.getTime() - (offset*60*1000)).toISOString().split('T')[0];
            let today;
            for(let i = 0; i < entries.length; i++) {
                if(date === entries[i].date) {
                    today = entries[i];
                }
            }
            let duration = today?.reach ?? 0;

            const body = {
                ...prev,
                id: item.id,
                name: item.name,
                type: item.type,
                goal: item.goal,
                ongoing: duration > 0,
                today: today ?? null
            };
            return body;
        })));
        setLoading(false);
        console.log("inside function",res);
    }

    useEffect(() =>  {
        getInitialActivities();
        console.log("initial",activity);
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
                       { !loading ? <ClockGraph activity={activity} /> : <CircularProgress /> }
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