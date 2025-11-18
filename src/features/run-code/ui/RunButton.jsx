import './RunButton.css';

export const RunButton = ({ onRun, disabled }) => (
  <button className="run-button" onClick={onRun} disabled={disabled}>
    {disabled ? 'Running...' : 'Run'}
  </button>
);

