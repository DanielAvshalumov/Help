import { Grid, Typography, Box, Button, Grow, Paper } from "@mui/material";
import { Link } from "react-router-dom";


const Meals = ({ meals }) => {
    
    const mealsElement = meals.map((item,key) => (
            <Paper elevation={6} sx={{mb:3, height:'60px', backgroundColor:'transparent'}}>
                <Typography  color={"lightgoldenrodyellow"} key={key} variant="h5" >{item.mealName+" "+item.protein+" "+item.calories}</Typography>
            </Paper>
    ));
    console.log(meals);
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