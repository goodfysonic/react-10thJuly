import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Row, Col } from 'antd';
import UserListPage from './UserListPage';
import NewUserForm from './NewUserForm';
import UserSavePage from './UserSavePage';

const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleEditUser = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={() => navigate('/users')}>Users</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: '0 16px' }}>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col span={20}>
            <Button type="primary" onClick={handleCreateUser} style={{ marginBottom: '20px' }}>
              Create User
            </Button>
            <Routes>
              <Route path="/users" element={<UserListPage onEditUser={handleEditUser} />} />
              <Route path="/users/create" element={<NewUserForm />} />
              <Route path="/users/:id" element={<UserSavePage />} />
            </Routes>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tran Gia Huy with Love</Footer>
    </Layout>
  );
};

export default App;
