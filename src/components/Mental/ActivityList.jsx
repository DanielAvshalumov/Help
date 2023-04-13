import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Button, Slide, Paper, FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MentalService from "../../services/MentalService";


const ActivityList = ( { activity } ) => {
    
    const [checked, setChecked] = useState(false);
    const [type, setType] = useState("body");
    const [name, setName] = useState("");
    const [goal, setGoal] = useState(0);

    const containerRef = useRef();

    const activityElements = () => {
        const el =
                    <Accordion>
                        <AccordionSummary>
                            <Typography>Meditation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button variant="contained">Start</Button>
                        </AccordionDetails>
                    </Accordion>
                
        return el;
    }

    useEffect(() => {
        console.log(name,type,goal);
    },[name,type,goal]);

    const handleSubmit = async () => {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const body = {
            name: name,
            type: type,
            goal : goal,
        }
        const res = await MentalService.createActivity(id,body);
        console.log(res);
    };

    return (
        <>
            <Box display="flex" flexDirection="column" ref={containerRef.current} alignContent={"center"}>
                <Slide direction="left" in={!checked} container={containerRef.current}>
                    <Box>
                        <Typography variant="h3" mb={3}>Activities</Typography>
                        <Box>
                            {activityElements()}
                        </Box>
                    </Box>
                </Slide>
                <Slide direction="left" in={checked} container={containerRef.current} mr={7}>
                    <Box position="absolute">
                        <Paper elevation={6} sx={{
                            padding:"10px"
                        }}>
                            <Typography variant="h3">Activity</Typography>
                            <FormControl>
                                <FormLabel>Activity Name</FormLabel>
                                <TextField placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                                <FormLabel>Activity Type</FormLabel>
                                <RadioGroup value={type} onChange={(e) => {setType(e.target.value)}}>
                                    <FormControlLabel value="body" control={<Radio />} label="Body" />
                                    <FormControlLabel value="mind" control={<Radio />} label="Mind" />
                                    <FormControlLabel value="spirit" control={<Radio />} label="Spirit" />
                                </RadioGroup>
                                <FormLabel>Goal Duration</FormLabel>
                                <TextField placeholder="Goal" type="number" onChange={e => {setGoal(e.target.value)}}/>
                                <Button onClick={handleSubmit}>New Activity</Button>
                            </FormControl>
                            
                        </Paper>
                    </Box>
                </Slide>
                <Button variant="contained"
                    onClick={() => {setChecked((prev) => !prev)}}
                    sx = {{ 
                        marginTop:"100%",
                    }}
                >Add</Button>
                
            </Box>
            
        </>
    )
}

export default ActivityList;