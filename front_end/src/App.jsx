import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Standalone Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Layout Pages with Navigation Bar */}
        <Route 
          path="/*" 
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
