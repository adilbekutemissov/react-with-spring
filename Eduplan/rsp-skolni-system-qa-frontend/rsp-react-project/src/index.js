import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/index.css';
import './style/css/App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'mdbreact/dist/css/mdb.css';
import './style/css/Hover.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
