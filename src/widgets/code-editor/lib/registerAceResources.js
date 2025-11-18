/* eslint-disable global-require */
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/worker-javascript';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';

import { CODE_LANGUAGES, CODE_THEMES } from '../../../shared/config/editor';

CODE_LANGUAGES.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

CODE_THEMES.forEach((theme) => {
  require(`ace-builds/src-noconflict/theme-${theme}`);
});

