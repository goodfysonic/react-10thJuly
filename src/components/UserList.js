import React from 'react';
import { connect } from 'react-redux';
import { deleteUserRequest } from '../actions/users';
import { Table, Popconfirm, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const UserList = ({ users, deleteUserRequest, onEditClick }) => {
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
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEditClick(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUserRequest(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey="id" />;
};

const mapStateToProps = state => ({
  users: state.users.items,
});

export default connect(mapStateToProps, { deleteUserRequest })(UserList);
