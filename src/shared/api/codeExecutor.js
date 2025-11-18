export const executeCode = async (language, code) => {
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

  const data = await response.json();
  return data;
};

