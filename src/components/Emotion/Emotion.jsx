import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EmotionService from '../../services/EmotionService';

const MyRadio = (props) => {
    return (
        <Radio 
            disableRipple
            color="default"
            {...props}
        />
    )
}

const Emotion = () => {

    const [mood,setMood] = useState(0);
    
    useEffect(() => {
        console.log(mood);

    },[mood]);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(mood);
        let id = JSON.parse(localStorage.getItem("user")).id
        console.log(id);
        return await EmotionService.createEmotion(id,mood);
    }

    return (
        <>
            <Grid container display="flex">
                <Grid mt={4} ml={15} item>
                    <Paper>
                        <Typography variant='h5'>How are you feeling</Typography>
                        <form onSubmit={onSubmit}>
                            <FormControl>
                                <FormLabel sx={{ marginLeft:9 }} >I feel ... </FormLabel>
                                <RadioGroup defaultValue onChange={(e) => setMood(e.target.value)}>
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
            </Grid>
        </>
    )
}

export default Emotion;