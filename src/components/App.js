import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewUserForm from './NewUserForm';
import UserList from './UserList';
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users';
import { Layout, Menu, Alert } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getUsersRequest());
    }, [dispatch]);

    const handleCreateUserSubmit = ({ firstName, lastName }) => {
        dispatch(createUserRequest({ firstName, lastName }));
    };

    const handleDeleteUserClick = (userId) => {
        dispatch(deleteUserRequest(userId));
    };

    const handleCloseAlert = () => {
        dispatch(usersError({ error: '' }));
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
                    <NewUserForm onSubmit={handleCreateUserSubmit} />
                    {!!users.items && !!users.items.length &&
                        <UserList onDeleteClick={handleDeleteUserClick} users={users.items} />
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Tran Gia Huy with Love</Footer>
        </Layout>
    );
};

export default App;
