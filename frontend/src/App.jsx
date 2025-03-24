import { useEffect } from "react"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/AdminPanel/Dashboard"
import { Login } from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Home from "./pages/Home"


function App() {
  let [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(() =>{
      if(localStorage.getItem('token')){
          setIsLoggedIn(true)
      }
  },[])
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}></Route>
      <Route path="/login" element={<Login isLoggedIn={isLoggedIn}/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn}/>}></Route>
      
    </Routes>
   </BrowserRouter>
  )
}

export default App
