import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserList from './UserList';
import { createUserRequest, deleteUserRequest, updateUserRequest, usersError } from '../actions/users';
import { Layout, Menu, Alert, Button, Row, Col } from 'antd';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';
import useListPage from '../hooks/useListPage';

const { Header, Content, Footer } = Layout;

const apiConfig = {
  user: {
    getlist: 'http://localhost:3001/users',
  },
};

const App = () => {
    const dispatch = useDispatch();
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, openModal, closeModal] = useModal();

    const { data: users, pagination, loading, error, handleTableChange } = useListPage(apiConfig.user);

    const handleCreateUserSubmit = ({ firstName, lastName }) => {
        dispatch(createUserRequest({ firstName, lastName }));
        closeModal();
    };

    const handleEditUserSubmit = ({ id, firstName, lastName }) => {
        dispatch(updateUserRequest({ id, firstName, lastName }));
        setEditingUser(null);
        closeModal();
    };

    const handleDeleteUserClick = (userId) => {
        dispatch(deleteUserRequest(userId));
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        openModal();
    };

    const handleCloseAlert = () => {
        dispatch(usersError({ error: '' }));
    };

    const handleCloseModal = () => {
        setEditingUser(null);
        closeModal();
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
                        {error && (
                            <Alert
                                message="Error"
                                description={error.message}
                                type="error"
                                showIcon
                                closable
                                onClose={handleCloseAlert}
                                style={{ marginBottom: '20px' }}
                            />
                        )}
                        <Button type="primary" onClick={openModal} style={{ marginBottom: '20px' }}>
                            Create User
                        </Button>
                        <CustomModal 
                            isOpen={isModalOpen} 
                            handleClose={handleCloseModal} 
                            onSubmit={editingUser ? handleEditUserSubmit : handleCreateUserSubmit}
                            initialValues={editingUser}
                        />
                        <UserList 
                            onDeleteClick={handleDeleteUserClick} 
                            onEditClick={handleEditClick} 
                            users={users} 
                            pagination={pagination}
                            loading={loading}
                            onChange={handleTableChange}
                        />
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Tran Gia Huy with Love</Footer>
        </Layout>
    );
};

export default App;
