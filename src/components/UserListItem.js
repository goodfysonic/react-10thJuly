import React from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteUserRequest } from '../actions/users';

const UserListItem = ({ user, onEditUser }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUserRequest(user.id));
  };

  return (
    <Card className="user-item" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        <Button type="primary" onClick={() => onEditUser(user.id)} style={{ marginRight: '10px' }}>
          Edit
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
};

export default UserListItem;