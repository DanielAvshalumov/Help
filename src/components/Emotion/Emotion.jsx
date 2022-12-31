import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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

    return (
        <>
            <Grid container display="flex">
                <Grid mt={4} ml={15} item>
                    <Paper>
                        <Typography variant='h5'>How are you feeling</Typography>
                        <FormControl>
                            <FormLabel sx={{ marginLeft:9 }} >I feel ... </FormLabel>
                            <RadioGroup defaultValue onChange={(e) => setMood(e.target.value)}>
                                <FormControlLabel value={5} control={<MyRadio />} label="😊 Never Better" />
                                <FormControlLabel value={4} control={<MyRadio />} label="🙂 Good" />
                                <FormControlLabel value={3} control={<MyRadio />} label="😶 Content" />
                                <FormControlLabel value={2} control={<MyRadio />} label="🙁 Bad" />
                                <FormControlLabel value={1} control={<MyRadio />} label="😫 Can't get worse" />
                            </RadioGroup>
                            <Button>Submit</Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Emotion;