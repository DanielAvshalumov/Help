import React from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import EmotionService from '../../services/EmotionService';

import ZoomableLineChart from './Graph';
import Thoughts from './Thoughts';

const MyRadio = (props) => {
    return (
        <Radio 
            disableRipple
            color="default"
            {...props}
        />
    )
}


const Emotion = ({ data }) => {

    const [mood,setMood] = useState(0);    
    const [checked,setChecked] = useState(false);
    const [comment, setComment] = useState("");
    // change
    const [graphData, setGraphData] = useState(data.map(item => (item.rate)));

    const onSubmit = async (e) => {
        e.preventDefault();
        let id = JSON.parse(localStorage.getItem("user")).id;
        let body = {
            rate:mood,
            message:comment,
        };
        const res = await EmotionService.createEmotion(id,body);
        // change
        setGraphData((prev) => [...prev,res.data.rate]);
        console.log(res);
    }
    const handleClick = (e) => {
        setMood(e.target.value);
        setChecked(true);
    }

    return (
        <>
            <Grid container display="flex" justifyContent={"space-around"}>
                <Grid item>
                    <ZoomableLineChart data={graphData} />
                </Grid>

                <Grid mr={-5} item >
                    <Paper sx={{ padding:1, borderRadius:3 }}>
                        <Typography variant='h5' >How are you feeling</Typography>
                        <form onSubmit={onSubmit}>
                            <FormControl>
                                <FormLabel sx={{ marginLeft:9}} >I feel ... </FormLabel>
                                <RadioGroup defaultValue onChange={handleClick}>
                                    <FormControlLabel value={5} control={<MyRadio />} label="😊 Never Better" />
                                    <FormControlLabel value={4} control={<MyRadio />} label="🙂 Good" />
                                    <FormControlLabel value={3} control={<MyRadio />} label="😶 Content" />
                                    <FormControlLabel value={2} control={<MyRadio />} label="🙁 Bad" />
                                    <FormControlLabel value={1} control={<MyRadio />} label="😫 Can't get worse" />
                                </RadioGroup>
                                <Button type="submit" >Submit</Button> 
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
                
                <Grid mr={-20} item > 
                    <Thoughts data={data}/>
                </Grid>
                
                    
                {checked && 
                                <TextField 
                                    onChange={(e) => setComment(e.target.value)}
                                    variant="outlined"
                                    label="Talk about it"
                                    size="large"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    color="secondary"
                                    sx={{ width:"800px", marginTop:-20}}
                                />}
                
            </Grid>
        </>
    )
}

export default Emotion;