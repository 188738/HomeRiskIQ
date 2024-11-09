import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home'; // Import the Home component
import Risk from './components/CalculateRisk/CalculateRisk'; // Import the Risk component

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/risk">Risk</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/risk" element={<Risk />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
