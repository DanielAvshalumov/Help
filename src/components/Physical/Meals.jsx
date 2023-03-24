import { Grid, Typography, Box, Button, Grow, Paper } from "@mui/material";
import { Link } from "react-router-dom";


const Meals = ({ meals, dispatch }) => {

    const updateCaloriesFromMeal = (e) => {
        let target = e.target.getAttribute('value');
        let payload = meals.filter((element) => element.mealName === target);
        //Makes array with index one into single object
        dispatch({type:'eat',payload:{...payload[0]}});
    }
    
    const mealsElement = meals.map((item,key) => (
            <Paper key={key} value={item.mealName} elevation={6} onClick={updateCaloriesFromMeal} sx={{mb:3, height:'60px', backgroundColor:'transparent'}}>
                <Typography value={item.mealName} color={"lightgoldenrodyellow"} variant="h5"  >
                    {item.mealName+" - Calories: "+item.calories+", Protein: "+item.protein+", Carbs: "+item.carbs+", Fat: "+item.fat}
                </Typography>
            </Paper>
    ));
    
    return (
        <>
            <Grid item md={8} lg={6}>
            <Typography variant="h3" textAlign="center">Meals</Typography>
            <Box mt={3} ml={6} textAlign='center'>
                <Grow in={true}>
                    <div>
                        {mealsElement}
                    </div>
                </Grow>
                <Link to="/home/physical/addmeal">
                    <Button variant="contained" sx={{ mt:3 }}>Add a meal</Button>
                </Link>
            </Box>
            </Grid>
        </>
    )
}
export default Meals;