import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) throw new Error("Invalid JSON: Missing 'data' key");
      
      const res = await axios.post("http://localhost:3001/bfhl", parsedData);
      setResponseData(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON input");
      setResponseData(null);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>JSON Input</h2>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='{"data": ["A", "C", "z"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <h3>Select Data Type</h3>
          <select onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          {selectedOption && (
            <div>
              <h4>Response</h4>
              <p>{JSON.stringify(responseData[selectedOption], null, 2)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
