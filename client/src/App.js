import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Main from "./components/Main";
import Navigator from "./components/Navigator";

import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";

function App() {
  
  const [userLogged,setUserLogged] = useState(false);

  useEffect(() => {
    let cookie = localStorage.getItem('user');
    console.log(JSON.parse(cookie));
    if(cookie) {
      setUserLogged(() =>({name:JSON.parse(cookie).username}))
    }
  },[])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path={"/*"} element=
          {<Main 
            userLogged={userLogged} setUserLogged={setUserLogged}
            />
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
