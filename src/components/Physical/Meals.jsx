import { Divider, Grid, Typography, Box, TextField, Fade, Button } from "@mui/material";
import { Link } from "react-router-dom";


const Meals = () => {
    return (
        <>
            <Grid item textAlign={"center"} md={8} lg={6}>
                <Typography variant="h3" textAlign="center">Meals</Typography>
                <Link to="/home/physical/addmeal">
                    <Button variant="contained" sx={{ mt:3 }}>Add a meal</Button>
                </Link>
            </Grid>
        </>
    )
}
export default Meals;