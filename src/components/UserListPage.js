import React from 'react';
import { Table, Alert, Button, Popconfirm } from 'antd';
import useListPage from '../hooks/useListPage';

const UserListPage = ({ onEditUser }) => {
    const apiConfig = {
        getlist: 'http://localhost:3001/api/users'
    };

    const {
        data: users,
        pagination,
        loading,
        error,
        deleteUser,
        setPagination
    } = useListPage(apiConfig);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
            current: pagination.current,
            pageSize: pagination.pageSize
        });
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => onEditUser(record.id)} style={{ marginRight: 8 }}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => deleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

    return (
        <div>
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
