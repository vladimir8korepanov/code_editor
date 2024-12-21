import React from 'react';
import "./ResultDisplay.css"

function ResultDisplay({ result }) {

  return (
    <div className="result-display">
      <div className="result">
        {result && result.output && <p>{result.output}</p>}
        {result && result.error && <p>Error: {result.error}</p>}
      </div>
    </div>
  );
}

export default ResultDisplay;