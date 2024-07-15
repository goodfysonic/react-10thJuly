
import App from './components/App';
import UserSavePage from './components/UserSavePage';

const routesConfig = [
  {
    path: '/',
    element: <App />
  },
  {
    path: '/user/create',
    element: <UserSavePage />
  },
  {
    path: '/user/:id',
    element: <UserSavePage />
  }
];

export default routesConfig;
