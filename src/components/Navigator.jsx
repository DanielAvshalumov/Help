import React, {useEffect, useState} from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";



function Navigator(props) {

    const location = useLocation();
    const nav = useNavigate();
    console.log(location);
    const handleClick = (e) => {
        if(props.userLogged === false) {
            if(location.pathname === "/login") {
                nav("/signup");
            } else {
                nav("/login");
            }
        } else {
            nav("/login");
            props.setUserLogged(false);
        }
    }

    return (
        <>
            <Box>
                <AppBar position="static" color="secondary">
                    <Toolbar variant="dense">
                        { props.userLogged &&
                        (<IconButton variant="dense" aria-label="menu" sx={{ mr:2 }} color="inherit">
                            <MenuIcon />
                        </IconButton>)
                        }
                        {
                        <Button color="primary" variant="contained" sx={{ marginLeft:"88%" }} onClick={handleClick}>
                            {
                                props.userLogged ? "Log Out" : 
                                location.pathname === "/login" ? "Sign In" : 
                                "Log In" 
                            }                                
                        </Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navigator;