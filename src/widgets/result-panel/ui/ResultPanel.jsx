import './ResultPanel.css';

export const ResultPanel = ({ result, isLoading }) => (
  <div className="result-panel">
    {isLoading && <p>Loading...</p>}
    {!isLoading && result?.output && <p>{result.output}</p>}
    {!isLoading && result?.error && <p className="error">Error: {result.error}</p>}
  </div>
);

