import React, { useEffect } from 'react';
import { Table, Spin, Alert, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from '../actions/users';
import UserListItem from './UserListItem';

const UserListPage = ({ onEditUser }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (text, record) => <UserListItem user={record} onEditUser={onEditUser} />
    }
  ];

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error.message} type="error" showIcon />;
  }

  return (
    <Card title="Users" bordered={false} style={{ marginTop: '20px' }}>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="id"
      />
    </Card>
  );
};

export default UserListPage;
