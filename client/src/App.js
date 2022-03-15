import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login/Login.jsx';
import Registration from './pages/Registration';
import ErrorPage from "./pages/ErrorPage"
import User from './pages/User';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Registration />}></Route>
        <Route exact path='/user' element={<User />}></Route>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='*' element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
