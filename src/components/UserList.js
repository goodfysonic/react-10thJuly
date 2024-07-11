import React from 'react';
import { connect } from 'react-redux';
import { deleteUserRequest } from '../actions/users';
import { Popconfirm, Button, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const UserList = ({ users, deleteUserRequest, onEditClick }) => {
  return (
    <List
      bordered
      dataSource={users}
      renderItem={user => (
        <List.Item
          actions={[
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEditClick(user)}
            >
              Edit
            </Button>,
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => deleteUserRequest(user.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>Delete</Button>
            </Popconfirm>
          ]}
        >
          {user.firstName} {user.lastName}
        </List.Item>
      )}
    />
  );
};

const mapStateToProps = state => ({
  users: state.users.items
});

export default connect(mapStateToProps, { deleteUserRequest })(UserList);
