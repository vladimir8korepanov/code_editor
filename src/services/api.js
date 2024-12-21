// Пример API для выполнения кода
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
        throw new Error('Server error');
      }
  
      const data = await response.json({
        "language": language,
        "code": code
    });
      return data;  // Ответ от сервера (результат выполнения кода)
    } catch (error) {
      return { output: '', error: error.message };  // Обработка ошибок
    }
  };
  