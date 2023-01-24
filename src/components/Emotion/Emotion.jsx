import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import EmotionService from '../../services/EmotionService';
import {select, line, curveCardinal, scaleLinear} from "d3";


const Emotion = () => {
    const [mood,setMood] = useState(0);
    const [data,setData] = useState([]);
    const [checked,setChecked] = useState(false);
    const [comment, setComment] = useState("");

    const svgRef = useRef();

    const MyRadio = (props) => {
        return (
            <Radio 
                disableRipple
                color="default"
                {...props}
            />
        )
    }


    const updateData = () => {
        let mounted = true
        let id = JSON.parse(localStorage.getItem("user")).id;

        EmotionService.getAllEmotions(id).then((payload) => {
            if(mounted) {
                setData(payload.data);
            }
        });

        return () => {
            mounted = false;
        }
    }

    useEffect(() => {
        updateData();
    },[]);

    useEffect(() => {
        console.log("effect");
        const dataArr = data.map(item => (item.rate));
        console.log(dataArr);

        const svg = select(svgRef.current);
        const xScale = scaleLinear()
            .domain([0,data.length  - 1])
            .range[0,300]; 
        

        const myLine = line()
            .x((value, index) => index * 5)
            .y(value => 150 - value)
            .curve(curveCardinal);

        svg.selectAll("path")
            .data([dataArr])
            .join("path")
            .attr("d", value => myLine(value))
            .attr("fill", "none")
            .attr("stroke","blue");
    },[data]);

    
    
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
                <Grid mt={4} ml={15} item>
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
                                {checked && <TextField onChange={(e) => setComment(e.target.value)}/>}
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
                <Grid ml={10} item>
                    <svg ref={svgRef}></svg>
                </Grid>
            </Grid>
        </>
    )
}

export default Emotion;