# Code Editor

Простое SPA-приложение для запуска кода на Python и JavaScript прямо из браузера. Клиент построен по принципам Feature-Sliced Design (FSD), а сервер на Express выполняет код в изолированных временных файлах.

## Возможности

- Ace Editor с подсветкой и автодополнением
- Переключение языка/темы оформления
- Кнопка запуска с состоянием загрузки
- Показ stdout/stderr для каждой попытки

## Технологический стек

- React 18 + Feature-Sliced Design
- Ace Editor (`react-ace`, `ace-builds`)
- Node.js + Express
- `child_process.exec` + `tmp-promise` для безопасного исполнения кода

## Структура клиента (FSD)

```
src/
├─ app/            # точка входа приложения, глобальные стили
├─ pages/          # страницы (здесь EditorPage)
├─ widgets/        # крупные блоки (редактор, панель настроек, панель результата)
├─ features/       # функциональные элементы (run-code)
├─ shared/         # переиспользуемые сущности, API, конфиг
```

Такое деление упрощает масштабирование и тестирование отдельных частей UI.

## Установка и запуск

```bash
git clone https://github.com/vladimir8korepanov/code_editor.git
cd code_editor
npm install
```

### Запуск сервера

```bash
npm run server
# http://localhost:5000
```

Сервер пишет код во временный файл с нужным расширением и запускает интерпретатор (`python` или `node`), что позволяет корректно обрабатывать многострочные скрипты и строки с кавычками.

### Запуск клиента

```bash
npm start
# http://localhost:3000
```

## Взаимодействие клиента и сервера

`shared/api/codeExecutor.js` отправляет код на `/api/execute`:

```javascript
export const executeCode = async (language, code) => {
  const response = await fetch('http://localhost:5000/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language, code }),
  });

  if (!response.ok) {
    throw new Error('Server error');
  }

  return response.json();
};
```

На сервере `server/server.js` обрабатывает запрос, пишет код во временный файл и исполняет его:

```javascript
const runFromTempFile = async (code, extension, command) => {
  const { path: tempFilePath, cleanup } = await file({ postfix: extension });
  await fs.writeFile(tempFilePath, code);
  try {
    const { stdout, stderr } = await execPromise(`${command} "${tempFilePath}"`);
    if (stderr) {
      return { error: stderr };
    }
    return { output: stdout };
  } finally {
    await cleanup();
  }
};
```

Ответ всегда приходит в виде `{ status, output?, error? }`, что упрощает отображение результата на клиенте.

## Примечания безопасности

Приложение предназначено только для локального запуска. Выполнение произвольного кода на сервере потенциально опасно, поэтому не размещайте этот сервис в открытом доступе без дополнительной песочницы и ограничений.

---
Автор: Владимир Корепанов
