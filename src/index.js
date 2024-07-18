import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import AppRoutes from './routes'; 

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
    <AppRoutes /> 
  </Provider>
);