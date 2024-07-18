import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import UserListPage from './UserListPage';

const { Header, Content, Footer } = Layout;

const App = () => {
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
            <UserListPage />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tran Gia Huy with Love</Footer>
    </Layout>
  );
};

export default App;
