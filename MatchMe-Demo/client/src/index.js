import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import {ConnectedRouter} from 'connected-react-router';

ReactDOM.render(
    <Provider>
      <ConnectedRouter>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
