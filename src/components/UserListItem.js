import React from 'react';
import { Card } from 'antd';

const UserListItem = ({ user }) => {
  return (
    <Card className="user-item" style={{ marginBottom: '16px' }}>
      <div>{user.firstName} {user.lastName}</div>
    </Card>
  );
};

export default UserListItem;
