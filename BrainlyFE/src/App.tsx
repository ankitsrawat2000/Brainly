import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

import { Landing } from "./pages/Landing";

import { SharePage } from "./pages/SharePage";
import { Dashboard } from "./pages/Dashboard";



function App(){

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/share/:shareId" element={<SharePage/>}/>
    </Routes>
  </BrowserRouter>
}

export default App