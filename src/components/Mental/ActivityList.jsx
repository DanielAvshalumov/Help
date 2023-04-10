import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Button, Slide, Paper} from "@mui/material";
import { useRef, useState } from "react";


const ActivityList = ( { activity } ) => {
    
    const [checked, setChecked] = useState(false);
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
            <Box display="flex" flexDirection="column" justifyContent="center" ref={containerRef.current}>
                <Typography variant="h3" mb={3}>Activities</Typography>
                {activityElements()}
                <Slide direction="left" in={checked} container={containerRef.current}>
                    <Box position="absolute">
                        <Paper>
                            <Typography variant="h3">Activity</Typography>
                        </Paper>
                    </Box>
                </Slide>
                <Button variant="contained" onClick={() => {setChecked((prev) => !prev)}}>Add</Button>
                
            </Box>
            
        </>
    )
}

export default ActivityList;