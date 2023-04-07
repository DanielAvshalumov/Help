import { Accordion, Box, Grid, Typography } from "@mui/material";
import react, { useState } from "react";
import ClockGraph from "./ClockGraph";

const Mental = () => {

    const [expanded, setExpanded] = useState(false);
    const handleChange = panel => {

    }

    const activityElements = () => {

    }
    
    return (
        <>
            <Box>
                <Grid container>
                    <Grid item>
                        <Typography variant="h3">{new Date().toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item>
                        <ClockGraph />
                    </Grid>
                    <Grid item>
                        <Accordion>
                            <Typography>Cool</Typography>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Mental;