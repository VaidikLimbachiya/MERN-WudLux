// import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Users from './pages/Users/Users'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "https://mern-wudlux-1-lss8.onrender.com"

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          <Route path="/users" element={<Users url={url}/>}/>
        </Routes>

      </div>
    </div>
    
  )
}

export default App