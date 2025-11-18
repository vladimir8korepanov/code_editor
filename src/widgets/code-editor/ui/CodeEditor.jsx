import AceEditor from 'react-ace';

import '../lib/registerAceResources';
import './CodeEditor.css';

export const CodeEditor = ({ mode, theme, value, onChange }) => (
  <AceEditor
    className="code-editor"
    mode={mode}
    theme={theme}
    value={value}
    onChange={onChange}
    name="code-editor"
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      useWorker: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />
);

