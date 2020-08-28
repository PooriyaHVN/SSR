import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/Reducers';
import { BrowserRouter as Router } from 'react-router-dom'
import Thunk from 'redux-thunk';
const middlewears = [ Thunk ];
export const store = createStore(reducers, applyMiddleware(...middlewears));
 typeof window !== 'undefined' && ReactDOM.hydrate(
   <Router>
        <Provider store = { store }>
            <React.StrictMode>
              <App />
              </React.StrictMode>
      </Provider>
   </Router>,
  document.getElementById('root')
  );
