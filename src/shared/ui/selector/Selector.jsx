import './selector.css';

export const Selector = ({ title, list, current, onChange }) => (
  <div className="selector">
    <label>{title}</label>
    <select value={current} onChange={(event) => onChange(event.target.value)}>
      {list.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

