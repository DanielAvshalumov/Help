import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography } from "@mui/material";
import react, { useState } from "react";
import ClockGraph from "./ClockGraph";

const Mental = () => {

        

    
    return (
        <>
            <Box>
                <Grid container display="flex" justifyContent="space-around" ml={-6}>
                    <Grid item>
                        <Typography variant="h3">{new Date().toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item>
                        <ClockGraph />
                    </Grid>
                    <Grid item>
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
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Mental;