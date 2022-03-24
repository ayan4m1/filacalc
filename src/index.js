import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './icons.js';

import './index.scss';
import App from './components/App/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

export default App;
