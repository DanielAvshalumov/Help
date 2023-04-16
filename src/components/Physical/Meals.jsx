import { Grid, Typography, Box, Button, Grow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PhysicalService from "../../services/PhysicalService";


const Meals = ({ meals, dispatch }) => {

    const updateCaloriesFromMeal = (e) => {
        let target = e.target.getAttribute('value');
        let payload = meals.filter((element) => element.mealName === target);
        //Makes array with index one into single object
        dispatch({type:'eat',payload:{...payload[0]}});
    }
    
    const handleRemove = async (e) => {
        e.preventDefault();
        let id = e.target.value;
        const res = await PhysicalService.removeMeal(id).catch(error => console.log(error));
        dispatch({type:'remove-meal',payload:id});
        console.log(res);
    }
    
    const mealsElement = meals.map((item,key) => (
        <Box key={key} display={"flex"} sx={{ alignItems:'center', }}>
            <Paper value={item.mealName} elevation={6} onClick={updateCaloriesFromMeal} sx={{"&:hover":{cursor:"pointer"}, margin:'auto', padding:2 ,mb:3, backgroundColor:'transparent',}}>
                <Typography value={item.mealName} color={"lightgoldenrodyellow"} variant="h5" noWrap>
                    {item.mealName+" - Calories: "+item.calories+", Protein: "+item.protein+", Carbs: "+item.carbs+", Fat: "+item.fat}
                </Typography>
            </Paper>
            <Button variant="contained" color="secondary" value={item.id} onClick={handleRemove} sx={{height:30,}}>Remove</Button>
        </Box>
    ));
    
    return (
        <>
            <Grid item md={8} lg={6}>
            <Box ml={6} textAlign='center'>
            <Typography variant="h3" textAlign="center" sx={{ mb:3 }}>Meals</Typography>
                <Grow in={true}>
                    <div>
                        {mealsElement}
                    </div>
                </Grow>
                <Link to="/home/physical/addmeal" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{ mt:3 }}>Add a meal</Button>
                </Link>
            </Box>
            </Grid>
        </>
    )
}
export default Meals;