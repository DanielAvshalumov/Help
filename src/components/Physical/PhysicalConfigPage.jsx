import { Divider, Grid, Typography, Box, TextField, Fade, Button } from "@mui/material";


const PhysicalConfigPage = ({ firstUse }) => {
    return (
    <>
    <Fade in={!firstUse} timeout={4000}>
        <Typography >Enter your Macros here</Typography>
        <Box >
            <TextField  />
            <TextField  />
            <Button type="submit">Submit</Button>
        </Box>
    </Fade>
    </>
    )
}
export default PhysicalConfigPage;