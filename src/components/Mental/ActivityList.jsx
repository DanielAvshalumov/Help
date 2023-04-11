import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Button, Slide, Paper, FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import { useRef, useState } from "react";


const ActivityList = ( { activity } ) => {
    
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState("body");
    const containerRef = useRef();

    const activityElements = () => {
        const el =<Box>
                    <Accordion>
                        <AccordionSummary>
                            <Typography>Meditation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button variant="contained">Start</Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Typography>Exercise</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button variant="contained">Start</Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Typography>Studying</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button variant="contained">Start</Button>
                        </AccordionDetails>
                    </Accordion>
                </Box>
        return el;
    }

    return (
        <>
            <Box display="flex" flexDirection="column" ref={containerRef.current} alignContent={"center"}>
                <Slide direction="left" in={!checked} container={containerRef.current}>
                    <Box>
                        <Typography variant="h3" mb={3}>Activities</Typography>
                        {activityElements()}
                    </Box>
                </Slide>
                <Slide direction="left" in={checked} container={containerRef.current} mr={7}>
                    <Box position="absolute">
                        <Paper sx={{
                            padding:"10px"
                        }}>
                            <Typography variant="h3">Activity</Typography>
                            <FormControl>
                                <FormLabel>Activity Name</FormLabel>
                                <TextField placeholder="Name"/>
                                <FormLabel>Activity Type</FormLabel>
                                <RadioGroup value={value} onChange={(e) => {setValue(e.target.value)}}>
                                    <FormControlLabel value="body" control={<Radio />} label="Body" />
                                    <FormControlLabel value="mind" control={<Radio />} label="Mind" />
                                    <FormControlLabel value="spirit" control={<Radio />} label="Spirit" />
                                </RadioGroup>
                                <FormLabel>Goal Duration</FormLabel>
                                <TextField placeholder="Goal" type="number" />
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