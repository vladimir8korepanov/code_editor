import './selector.css'
const LanguageSelector = ({ title, list, current, setMode }) => (
    <div className='selector'>
      <label>{title}</label>
      <select value={current} onChange={(e) => setMode(e.target.value)}>
        {list.map((item, index) => (
          <option key={index} value={item}>{item}</option>  // Для каждого элемента массива создается элемент <li>
        ))}
      </select>
    </div>
  );
  
  export default LanguageSelector;
  