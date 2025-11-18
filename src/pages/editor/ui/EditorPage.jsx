import { useCallback, useState } from 'react';

import { RunButton, useCodeRunner } from '../../../features/run-code';
import { CodeEditor } from '../../../widgets/code-editor';
import { ResultPanel } from '../../../widgets/result-panel';
import { SettingsPanel } from '../../../widgets/settings-panel';
import {
  CODE_LANGUAGES,
  CODE_THEMES,
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
} from '../../../shared/config/editor';

import './EditorPage.css';

export const EditorPage = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [code, setCode] = useState('');
  const { runCode, loading, result } = useCodeRunner();

  const handleRun = useCallback(() => {
    if (!code.trim()) {
      return;
    }

    runCode({ language, code });
  }, [code, language, runCode]);

  return (
    <div className="editor-page">
      <h1 className="page-title">Online Code Editor</h1>
      <SettingsPanel
        languages={CODE_LANGUAGES}
        themes={CODE_THEMES}
        currentLanguage={language}
        currentTheme={theme}
        onLanguageChange={setLanguage}
        onThemeChange={setTheme}
      />
      <CodeEditor mode={language} theme={theme} value={code} onChange={setCode} />
      <RunButton onRun={handleRun} disabled={loading || !code.trim()} />
      <ResultPanel result={result} isLoading={loading} />
    </div>
  );
};

