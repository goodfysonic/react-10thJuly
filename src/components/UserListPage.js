import React from 'react';
import { Table, Spin, Alert, Button, Popconfirm } from 'antd';
import useListPage from '../hooks/useListPage';

const UserListPage = () => {
    const apiConfig = {
        getlist: 'http://localhost:3001/api/users'
    };

    const {
        data: users,
        pagination,
        loading,
        error,
        editUser,
        deleteUser,
        setPagination
    } = useListPage(apiConfig);

    const handleTableChange = (newPagination) => {
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => `${text.firstName} ${text.lastName}`
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => editUser(record.id, { firstName: 'Updated', lastName: 'Name' })} style={{ marginRight: 8 }}>Edit</Button>
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

    if (loading) return <Spin />;
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
