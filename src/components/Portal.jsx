import { Box, createStyles, Grid, Paper, Typography } from "@mui/material";

import react from "react"

const Portal = (props) => {
    // const styledPaper = styled()
    // const classes = makeStyles((theme) => {
    //     createStyles({
    //         root: {
    //             "&:hover": {
    //                 backgroundColor:"gray"
    //             }
    //         }
    //     })
    // })

    return (
        <>
            <Grid container display="flex" flexDirection="column">
                <Grid item mb={4}>
                    <Typography align="center" variant="h3">Welcome to your page, {props.userData.name}</Typography>
                </Grid>
                <Box display="flex" justifyContent={"space-evenly"}>
                    <Grid item>
                        <Paper elevation={5} sx= {{"&:hover":{cursor:"pointer"}}}>
                            <Typography variant="h4">Mental Health</Typography>
                        </Paper>
                    </Grid>
                    <Grid item ml={4}>
                        <Paper elevation={5} sx= {{"&:hover":{cursor:"pointer"}}}>
                            <Typography variant="h4">Physical Health</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={5} sx= {{"&:hover":{cursor:"pointer"}}}>
                            <Typography variant="h4">Emotional Health</Typography>
                        </Paper>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}

export default Portal;