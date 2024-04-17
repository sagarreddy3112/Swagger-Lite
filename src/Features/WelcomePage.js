// WelcomePage.js
import React from 'react';

const WelcomePage = () => {
  return (
    <div className="welcome-page-container"style={{ textAlign: 'center', marginTop: '100px' }}>
      <div className="welcome-page">
        <h1>Welcome to Swagger Lite</h1>
        <p>This is the welcome page for Swagger Lite. Click the button below to navigate to the data retrieval page.</p>
        <button onClick={() => window.location.href = '/getdata'}>Get Data</button>
      </div>
    </div>
  );
}

export default WelcomePage;
