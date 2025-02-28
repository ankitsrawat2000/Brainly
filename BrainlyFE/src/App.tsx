import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { SharePage } from "./pages/SharePage";



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