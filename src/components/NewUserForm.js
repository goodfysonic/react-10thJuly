
import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUserRequest, updateUserRequest, fetchUserRequest } from '../actions/users';

const NewUserForm = ({ users, createUserRequest, updateUserRequest, fetchUserRequest, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id && id !== 'create') {
      const existingUser = users.find((user) => user.id === parseInt(id, 10));
      if (existingUser) {
        form.setFieldsValue(existingUser);
        setIsEditing(true);
      } else {
        fetchUserRequest(id);
        setIsEditing(true);
      }
    } else {
      form.resetFields();
      setIsEditing(false);
    }
  }, [id, users, fetchUserRequest, form]);

  useEffect(() => {
    if (user && isEditing && !form.getFieldValue('firstName')) {
      form.setFieldsValue(user);
    }
  }, [user, isEditing, form]);

  const handleSubmit = (values) => {
    if (isEditing) {
      updateUserRequest({
        id: parseInt(id, 10),
        ...values,
      });
    } else {
      createUserRequest(values);
    }
    form.resetFields();
    navigate('/');
  };

  return (
    <div className="container">
      <h1>{id === 'create' ? 'Create User' : 'Edit User'}</h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.items,
  user: state.users.user,
});

const mapDispatchToProps = {
  createUserRequest,
  updateUserRequest,
  fetchUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
