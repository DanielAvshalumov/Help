import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Main from "./components/Main";
import Navigator from "./components/Navigator";

import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";

function App() {
  
  const [userLogged,setUserLogged] = useState(false);
  

  
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
