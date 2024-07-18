import React from 'react';
import { Table, Alert, Button, Popconfirm } from 'antd';
import useListPage from '../hooks/useListPage';

const UserListPage = () => {
    const {
        data: users,
        pagination,
        error,
        deleteUser,
        handleCreateUser,
        handleEditUser,
        setPagination,
    } = useListPage({ getlist: 'http://localhost:3001/api/users' });

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
            current: pagination.current,
            pageSize: pagination.pageSize
        });
    };

    const handleDeleteUser = (id) => {
        deleteUser(id);
    };

    const columns = [
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <>
                    <Button onClick={() => handleEditUser(record.id)} style={{ marginRight: 8 }}>Edit</Button>
                    <Popconfirm 
                        title="Are you sure to delete this user?" 
                        onConfirm={() => handleDeleteUser(record.id)} okText="Yes" cancelText="No">
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    if (error) {
        return <Alert message="Error loading users" description={error.message} type="error" showIcon />;
    }

    return (
        <div>
            <Button type="primary" onClick={handleCreateUser} style={{ marginBottom: '20px' }}>
              Create User
            </Button>
            <h1>Users</h1>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    onChange: handleTableChange
                }}
            />
        </div>
    );
};

export default UserListPage;
