import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './UserList';
import { getUsersRequest, createUserRequest, deleteUserRequest, updateUserRequest, usersError } from '../actions/users';
import { Layout, Menu, Alert, Button } from 'antd';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';

const { Header, Content, Footer } = Layout;

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [editingUser, setEditingUser] = useState(null);

    const [isModalOpen, openModal, closeModal] = useModal();

    useEffect(() => {
        dispatch(getUsersRequest());
    }, [dispatch]);

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
                <div style={{ padding: 24, minHeight: 360 }}>
                    <h2>Users</h2>
                    {users.error && (
                        <Alert
                            message="Error"
                            description={users.error}
                            type="error"
                            showIcon
                            closable
                            onClose={handleCloseAlert}
                        />
                    )}
                    <Button type="primary" onClick={openModal}>
                        Create User
                    </Button>
                    <CustomModal 
                        isOpen={isModalOpen} 
                        handleClose={handleCloseModal} 
                        onSubmit={editingUser ? handleEditUserSubmit : handleCreateUserSubmit}
                        initialValues={editingUser}
                    />
                    {!!users.items && !!users.items.length &&
                        <UserList 
                            onDeleteClick={handleDeleteUserClick} 
                            onEditClick={handleEditClick} 
                            users={users.items} 
                        />
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Tran Gia Huy with Love</Footer>
        </Layout>
    );
};

export default App;
