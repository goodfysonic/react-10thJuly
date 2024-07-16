import App from './components/App';
import UserSavePage from './components/UserSavePage';
import UserListPage from './components/UserListPage'; 

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
  },
  {
    path: '/users',
    element: <UserListPage /> 
  }
];

export default routesConfig;
