import express, { json } from 'express'; // Импортируем express и функцию json для обработки JSON
import { exec } from 'child_process'; // Импортируем exec для выполнения команд в командной строке
import util from 'util'; // Импортируем util для работы с промисами\
import cors from 'cors'; // Импортируем cors

const app = express();
const port = 5000;
const execPromise = util.promisify(exec); // Преобразуем функцию exec в функцию, возвращающую промис

// Настраиваем CORS для всех маршрутов
app.use(cors({
  origin: 'http://localhost:3000' // Разрешаем запросы с этого домена
}));
app.use(json()); // Используем middleware json для парсинга JSON в теле запроса

app.post('/api/execute', async (req, res) => { // Обработчик POST запроса на /api/execute
  const { language, code } = req.body; // Получаем язык и код из тела запроса
  console.log(code)
  try {
    let command;

    switch (language) {
      case 'python':
        command = `python -c "${code}"`; // Формируем команду для выполнения Python кода
        const { stdout: pyStdout, stderr: pyStderr } = await execPromise(command); // Выполняем команду и получаем stdout и stderr
        if (pyStderr) {
          return res.json({ status: 'error', error: pyStderr });
        }
        return res.json({ status: 'success', output: pyStdout });
        case 'javascript':
            try {
                // Используем eval для выполнения JavaScript кода
                const jsOutput = eval(code);
                return res.json({ status: 'success', output: String(jsOutput) }); // Преобразуем результат в строку
            } 
            catch (jsError) {
                return res.json({ status: 'error', error: String(jsError) }); // Преобразуем ошибку в строку
            }


      default:
        return res.json({ status: 'error', error: 'Unsupported language' });
    }

  } catch (error) {
    return res.json({ status: 'error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});