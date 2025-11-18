import { useCallback, useState } from 'react';

import { executeCode } from '../../../shared/api/codeExecutor';

export const useCodeRunner = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runCode = useCallback(
    async ({ language, code }) => {
      setLoading(true);
      try {
        const response = await executeCode(language, code);
        setResult(response);
        return response;
      } catch (error) {
        const fallback = { output: '', error: error.message };
        setResult(fallback);
        return fallback;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { runCode, loading, result };
};

