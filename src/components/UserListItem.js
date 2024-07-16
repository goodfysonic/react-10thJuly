import React from 'react';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteUserRequest } from '../actions/users';

const UserListItem = ({ user }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUserRequest(user.id));
  };

  return (
    <Card className="user-item" style={{ marginBottom: '16px' }}>
      <div>{user.firstName} {user.lastName}</div>
      <Button type="primary" danger onClick={handleDelete} style={{ marginTop: '10px' }}>
        Delete
      </Button>
    </Card>
  );
};

export default UserListItem;
