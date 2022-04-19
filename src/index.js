import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './index.scss';
import App from 'components/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

export default App;
