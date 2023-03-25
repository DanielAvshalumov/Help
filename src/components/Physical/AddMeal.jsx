import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhysicalService from "../../services/PhysicalService";

const AddMeal = ( { dispatch } ) => {
    
    const [mealForm, setMealForm] = useState({mealName:"",calories:0,protein:0,carbs:0,fat:0});

    useEffect(() => {
        console.log(mealForm);
    },[mealForm])

    const handleChange = (e) =>{
        const { name } = e.target;
        let { value } = e.target;
        console.log(e.target);
        // As to not save numbers as strings
        if(name !== "mealName") {
            value = parseInt(value);
        }
        setMealForm(prev => ( {...prev, [name]:value } ) );
    }   

    const handleSubmit = async () => {
        const id = JSON.parse(localStorage.getItem('user')).id;
        console.log(id);
        const res = await PhysicalService.saveMeal(id,mealForm);
        console.log(res);
        dispatch({type:'add-meal',payload:res.data});
    }

    return (
        <>
            <Grid item textAlign="center" md={7} lg={6}>
                <Typography variant="h3" textAlign="center">Add a Meal</Typography>
                <form>
                    <Box display="flex" flexDirection={"column"} alignItems="center"  onChange={handleChange}>
                        <TextField placeholder="Name" name="mealName"  sx={{ marginTop:2 }}/>
                        <TextField placeholder="Calories" type="number" name="calories" sx={{ marginTop:2 }}/>
                        <TextField placeholder="Protein" type="number" name="protein" sx={{ marginTop:2 }}/>
                        <TextField placeholder="Carbs" type="number" name="carbs" sx={{ marginTop:2 }}/>
                        <TextField placeholder="Fat" type="number" name="fat" sx={{ marginTop:2 }}/>
                        <Link to="/home/physical/meal">
                            <Button variant="contained" onClick={handleSubmit} sx={{ mt:3 }}>Add</Button>
                        </Link>
                    </Box>
                </form>
            </Grid>
        </>
    )
}

export default AddMeal;