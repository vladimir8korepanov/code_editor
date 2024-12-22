# Code Editor

## Описание

Этот проект представляет собой простой онлайн редактор кода, позволяющий пользователям писать и выполнять код на Python и JavaScript. Для выполнения кода используется бэкенд на Node.js с Express, который запускает код с помощью `child_process`.

## Функциональность

*   Редактор кода с подсветкой синтаксиса (используется Ace Editor).
*   Выбор языка программирования (Python/JavaScript).
*   Выполнение кода на сервере (Node.js/Express).
*   Отображение результатов выполнения или сообщений об ошибках.

## Технологии

*   React (фронтенд)
*   Ace Editor
*   Node.js
*   Express
*   child_process (для выполнения кода)
*   cors

## Установка и запуск

1.  Клонируйте репозиторий:

    ```bash
    git clone (https://github.com/vladimir8korepanov/code_editor.git)
    ```

2.  Перейдите в директорию проекта:

    ```bash
    cd code-editor
    ```

3.  Установите зависимости (как для фронтенда, так и для бэкенда):

    ```bash
    npm install
    cd server
    npm install
    cd ../
    ```
или
    ```bash
    npm install express cors
    ```

4.  Запустите бэкенд (сервер Node.js):

    ```bash
    cd server
    node server.js
    ```

    Сервер запустится на `http://localhost:5000`.

5.  В другом терминале запустите React-приложение (фронтенд):

    ```bash
    npm start
    ```

    Приложение будет доступно по адресу `http://localhost:3000`.

## Архитектура

Проект состоит из двух частей:

*   **Фронтенд (React):** Отвечает за пользовательский интерфейс, включая редактор кода, выбор языка и отображение результатов. Отправляет POST-запросы на бэкенд для выполнения кода.
*   **Бэкенд (Node.js/Express):** Получает код от фронтенда, выполняет его с помощью `child_process` (запуская интерпретаторы Python или Node.js), и возвращает результат (stdout или stderr) в формате JSON.

## api.js (пример):

```javascript
export const executeCode = async (language, code) => {
    try {
        const response = await fetch('http://localhost:5000/api/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ language, code }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return { status: 'error', error: error.message };
    }
};
```

## server.js (краткое описание):

Сервер на Node.js с Express обрабатывает POST-запросы на /api/execute. Он получает язык и код из тела запроса, формирует команду для выполнения (например, python -c "<code>"), запускает ее с помощью child_process.exec, и возвращает результат (stdout или stderr) в формате JSON.
## CORS

Для разрешения запросов с http://localhost:3000 (порт React-приложения) на http://localhost:5000 (порт сервера) используется middleware cors.

### Автор: Владимир Корепанов
