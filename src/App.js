// App.js
import React from 'react';
import "./Styles/WelcomePage.css"
import "./Styles/GetData.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import WelcomePage from './Features/WelcomePage';
import GetData from './Features/GetData'; // Import the GetData component

function App() {
  return (
    <Router>
      <div className="">
        <Routes> {/* Wrap routes inside Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/getdata" element={<GetData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
