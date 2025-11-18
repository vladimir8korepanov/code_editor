import { Selector } from '../../../shared/ui/selector/Selector';
import './SettingsPanel.css';

export const SettingsPanel = ({
  languages,
  themes,
  currentLanguage,
  currentTheme,
  onLanguageChange,
  onThemeChange,
}) => (
  <div className="settings-panel">
    <Selector
      title="Choose language:"
      list={languages}
      current={currentLanguage}
      onChange={onLanguageChange}
    />
    <Selector
      title="Choose theme:"
      list={themes}
      current={currentTheme}
      onChange={onThemeChange}
    />
  </div>
);

