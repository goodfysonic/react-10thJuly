import React from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { deleteUserRequest } from '../actions/users';

const UserList = ({
  users,
  deleteUserRequest,
  onEditUser,
  pagination,
  loading,
  onChange,
}) => {
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
      align: 'right',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEditUser(record.id)}
            style={{ marginRight: '10px' }}
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
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      pagination={pagination}
      loading={loading}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.users.items,
});

export default connect(mapStateToProps, { deleteUserRequest })(UserList);
