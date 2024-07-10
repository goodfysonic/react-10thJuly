import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
