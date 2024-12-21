import React, { useState } from "react";
import AceEditor from "react-ace"; // Импортируем компонент AceEditor для редактора кода
import './App.css'; // Импортируем стили приложения
import Selector from "./components/Selector"; // Импортируем компонент Selector для выбора языка и темы
import ResultDisplay from './components/ResultDisplay.jsx';
import { executeCode } from './services/api.js';

// Импортируем необходимые режимы (mode) и расширения (extensions) для Ace Editor.
// "src-noconflict" означает, что импорты не будут конфликтовать с другими библиотеками, использующими Ace.
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/worker-javascript"; // Импортируем worker для JavaScript
import "ace-builds/src-min-noconflict/ext-searchbox"; // Расширение для поиска по тексту в редакторе
import "ace-builds/src-min-noconflict/ext-language_tools"; // Расширение, содержащие инструменты для работы с языками(автодополнения, снипеты)

// Массив поддерживаемых языков программирования
const languages = [
  "python",
  "javascript"
];

// Динамически загружаем режимы и сниппеты для каждого языка из массива languages.
// Это делается для оптимизации размера бандла, чтобы не загружать все режимы сразу.
languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`); // Загружаем режим для текущего языка (например, mode-python.js)
  require(`ace-builds/src-noconflict/snippets/${lang}`); // Загружаем сниппеты для текущего языка (например, snippets/python.js)
});

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

// Динамически загружаекм темы оформления
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

function App() {
  // useState хуки для хранения текущего выбранного языка (режима) и темы
  const [mode, setMode] = useState('python');
  const [result, setResult] = useState('');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('github');
  const [loading, setLoading] = useState(false);  // Состояние для индикатора загрузки

  // Обработчик для запуска кода
  const handleRunCode = async () => {
    setLoading(true);  // Включаем индикатор загрузки
    try {
      const response = await executeCode(mode, code);  // Отправка кода на сервер
      setResult(response);  // Устанавливаем результат выполнения кода
    } catch (error) {
      setResult({ output: '', error: error.message });  // Обработка ошибок
    } finally {
      setLoading(false);  // Выключаем индикатор загрузки
    }
  };

  // Функция-обработчик изменений в редакторе. Вызывается при каждом изменении текста в редакторе.
  function onChange(newValue) {
    setCode(newValue)
  }

  return (
    <div className="App">
      {/* Компонент Selector для выбора языка */}
      <Selector 
      className = "selector" // Класс для стилизации
        title='Choose language: ' // Заголовок селектора
        list={languages} // Список доступных языков
        current={mode}  // Текущийвыбранный язык
        setMode={setMode} // Функция для обновления состояния mode
      />
      {/* Компонент Selector для выбора темы */}
      <Selector
      className = "selector"
        title='Choose theme: '
        list={themes}
        current={theme} 
        setMode={setTheme}
      />
      {/* Компонент AceEditor - сам редактор кода */}
      <AceEditor
        className="Editor"
        mode={mode}
        theme={theme}
        onChange={onChange} // Устанавливаем обработчик изменений текста
        name="UNIQUE_ID_OF_DIV" // Уникальный ID для div-контейнера редактора (важно для корректной работы)
        editorProps={{ $blockScrolling: true }} // Отключаем блочную прокрутку (может вызывать проблемы с позиционированием)
        setOptions={{
          useWorker: true,  // Включаем использование web worker для асинхронной обработки (улучшает производительность, особенно для автодополнения)
          enableBasicAutocompletion: true,  // Включаем базовое автодополнение
          enableLiveAutocompletion: true,    // Включаем использование сниппетов (шаблонов кода)
          enableSnippets: true,     // Включаем использование сниппетов (шаблонов кода)
          showLineNumbers: true,   // Отображаем номера строк
          tabSize: 2
        }}
      />
      <button className="run_code" onClick={handleRunCode} disabled={loading}>Run</button>
      {loading ? (
        <div>Loading...</div>  // Индикатор загрузки
      ) : (
        <ResultDisplay result={result} />
      )}
    </div>
  );
}

export default App;
