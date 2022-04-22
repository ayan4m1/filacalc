import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './index.scss';

import App from 'components/App';
import SettingsProvider from 'components/SettingsProvider';

ReactDOM.render(
  <SettingsProvider>
    <Router>
      <App />
    </Router>
  </SettingsProvider>,
  document.getElementById('root')
);

export default App;
