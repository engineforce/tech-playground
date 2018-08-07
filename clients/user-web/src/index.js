import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Home } from './Home';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ToastifyTest } from './ToastifyTest';

ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/toastify-test">Toastify Test</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/toastify-test" component={ToastifyTest} />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
