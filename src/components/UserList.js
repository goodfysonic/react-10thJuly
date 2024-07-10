import React from 'react';
import { connect } from 'react-redux';
import { deleteUserRequest } from '../actions/users'; 
import { Popconfirm, Button, List } from 'antd';  
const UserList = ({ users, deleteUserRequest }) => {
  return (
    <List
      bordered
      dataSource={users}
      renderItem={user => (
        <List.Item
          actions={[
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
