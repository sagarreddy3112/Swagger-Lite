import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios'; // Import axios

function App() {
  const [correlationId, setCorrelationId] = useState('');
  const [response, setResponse] = useState('');
  const [url, setUrl] = useState("");//https://devparticipant.afmsagaftrafund.org/participantserivice/viewParticipant
  const [apiType, setApiType] = useState('get'); // Defaulting to GET
  const [requestBody, setRequestBody] = useState();
  const [loading, setLoading] = useState(false);
  const handleApply = async () => {
    try {
      if (apiType === 'get' && !url) {
        alert('Please fill in Url fields');
        return;
      }
      if (!correlationId && apiType !== 'get') {
        alert('Please fill in all fields');
        return;
      }

      setLoading(true);
      let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      let headers = {
        'Content-Type': 'application/json',
        'correlationId': uniqueId + correlationId
      };

      let res = {};
      if (apiType === 'get') {
        res = await axios.get(url);
      } else {
        res = await axios.post(url, requestBody, { headers: headers });
      }

      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        setResponse(JSON.stringify(error.response.data, null, 2));
      } else {
        setResponse('Error fetching data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setRequestBody(event.target.value);
  };

  useEffect(() => {
    // Update the favicon dynamically
    const updateFavicon = () => {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = '/swaggerLite.png'; // Update the href to your custom favicon.ico path
      }
      document.title = "Swagger Lite";
    };

    updateFavicon(); // Call the function once to update favicon on component mount

    // Optionally, you can remove the event listener on component unmount
    return () => {
      window.removeEventListener('load', updateFavicon);
    };
  }, []);

  return (
    <div className="container">
      {loading && <div className="loading-overlay" />}
      <div className="left-pane">
        <h1 style={{ color: 'red' }}>SWAGGER LITE</h1>
        <div className="form">
          <label className="bold-label">
            API Type:
            <select
              value={apiType}
              onChange={(e) => setApiType(e.target.value)}
            >
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="put">PUT</option>
              <option value="delete">DELETE</option>
            </select>
          </label>
          <br />
          <label className="bold-label">
            URL:
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <br />
          <label className="bold-label">
            Correlation ID:
            <input
              type="text"
              value={correlationId}
              onChange={(e) => setCorrelationId(e.target.value)}
            />
          </label>
          <br />
          <label className="bold-label">
            Request Body:
            <textarea
              value={requestBody}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
      <div className="right-pane">
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default App;
