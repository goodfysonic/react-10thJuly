import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Row, Col } from 'antd';
import UserListPage from './UserListPage';  // Đảm bảo rằng bạn import đúng component

const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/user/create');
  };

  const handleEditUser = (userId) => {
    if (Number.isInteger(userId)) {
      navigate(`/user/${userId}`);
    } else {
      console.error('User ID is not an integer:', userId);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Users</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: '0 16px' }}>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col span={20}>
            <h2>Users</h2>
            <Button type="primary" onClick={handleCreateClick} style={{ marginBottom: '20px' }}>
              Create User
            </Button>
            <UserListPage onEditUser={handleEditUser} />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tran Gia Huy with Love</Footer>
    </Layout>
  );
};

export default App;
