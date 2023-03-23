import { Divider, Grid, Typography, Box, TextField, Fade, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PhysicalService from "../../services/PhysicalService";


const Meals = () => {
    
    const getMeals = async () => {
        const id = JSON.parse(localStorage.getItem('user')).id;
        const res = await PhysicalService.getMeals(id)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
    }
    useEffect(() => {
        getMeals();
    });
    
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