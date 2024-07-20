import UserListPage from './components/UserListPage';
import UserSavePage from './components/UserSavePage';

const routesConfig = [
  {
    path: '/',
    element: <UserListPage />,
  },
  {
    path: '/user/create',
    element: <UserSavePage />,
  },
  {
    path: '/user/:id',
    element: <UserSavePage />,
  },
];

export default routesConfig;
