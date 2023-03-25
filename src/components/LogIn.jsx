import { TextField, Typography, Box, Button, FormControl, FormLabel, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

function LogIn(props) {

    const [logInForm, setLogInForm] = useState({name:"",password:""});
    const [staySignedIn, setStaySignedIn] = useState(true);

    const handleLogInChange = (e) => {
        const {name, value} = e.target;
        setLogInForm({
            ...logInForm,
            [name]:value
        });        
    }
    // Erases previous failure message
    useEffect(() => {
        props.setIncorrectMessage("");
    },[]);
    useEffect(() => {
        console.log(logInForm,staySignedIn);
    },[logInForm,staySignedIn]);
    return (
        <>  <form onSubmit={props.handleSubmit}>
                <Box display={"flex"} flexDirection="column" alignItems={"center"}>
                    <Typography variant="h3" mb={4}>Log In</Typography>

                    <Box display={"flex"} flexDirection="column">
                        <TextField name="name" value={logInForm.name} placeholder="Name" type="text" onChange={handleLogInChange} sx={{marginBottom:"20px"}}/>
                        <TextField name="password" value={logInForm.password} placeholder="Password" type="password" onChange={handleLogInChange} sx={{marginBottom:"20px"}}/>
                    </Box>

                    { logInForm.password !== "" && logInForm.name !== "" ? 
                        (<Button color="primary" variant="contained" type="submit">Hey</Button>) :
                        (<Button disabled color="primary" variant="contained" type="submit">Hey</Button>) }

                    { props.incorrectMessage && 
                        (<Typography 
                            variant="subtitle1" color="#cc0000">{props.incorrectMessage}
                        </Typography>) }

                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    name="logCheck"
                                    checked={staySignedIn}
                                    onChange={()=>setStaySignedIn((prev)=>(!prev))}/>
                                }
                            label="Stay signed in?"
                            labelPlacement="end"                            
                        />
                    </FormControl>
                </Box>
            </form>
        </>
    )
}

export default LogIn;