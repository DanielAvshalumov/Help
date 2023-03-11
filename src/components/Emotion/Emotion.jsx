import React from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import EmotionService from '../../services/EmotionService';

import ZoomableLineChart from './Graph';

const MyRadio = (props) => {
    return (
        <Radio 
            disableRipple
            color="default"
            {...props}
        />
    )
}

console.log("fym");

const Emotion = (props) => {
    const [mood,setMood] = useState(0);
    
    const [checked,setChecked] = useState(false);
    const [comment, setComment] = useState("");
    //test
    const [datas, setDatas] = useState(
        Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
      );

    useEffect(() => {
        console.log("effect");
        const dataArr = props.data.map(item => (item.rate));
        console.log(dataArr);
        
    },[props.data]);

    
    const onSubmit = async (e) => {
        e.preventDefault();
        let id = JSON.parse(localStorage.getItem("user")).id;
        console.log(e.target);
        return await EmotionService.createEmotion(id,mood);
    }
    const handleClick = (e) => {
        setMood(e.target.value);
        setChecked(true);
    }

    return (
        <>
            <Grid container display="flex">
                <Grid mt={4} ml={49} item>
                    <Paper>
                        <Typography variant='h5'>How are you feeling</Typography>
                        <form onSubmit={onSubmit}>
                            <FormControl>
                                <FormLabel sx={{ marginLeft:9 }} >I feel ... </FormLabel>
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
                <Grid ml={14} mt={10} item>
                    <ZoomableLineChart data={datas} />
                </Grid>
                <Grid item m={9}>
                {checked && 
                                <TextField 
                                    onChange={(e) => setComment(e.target.value)}
                                    label="Talk about it"
                                    size="large"
                                    fullWidth
                                    multiline
                                    rows={10}
                                    color="secondary"
                                    sx={{marginLeft:"300px", width:"600px"}}
                                />}
                </Grid>
            </Grid>
        </>
    )
}

export default Emotion;