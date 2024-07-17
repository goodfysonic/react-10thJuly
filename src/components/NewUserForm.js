import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUserRequest, updateUserRequest, fetchUserRequest } from '../actions/users';

const NewUserForm = ({ users, createUserRequest, updateUserRequest, fetchUserRequest, user, loading, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id && id !== 'create') {
      fetchUserRequest(id);
      setIsEditing(true);
    } else {
      form.resetFields();
      setIsEditing(false);
    }
  }, [id, fetchUserRequest, form]);

  useEffect(() => {
    if (user && isEditing) {
      form.setFieldsValue(user);
    }
  }, [user, isEditing, form]);

  const handleSubmit = async (values) => {
    const action = isEditing ? updateUserRequest : createUserRequest;
    await action({ ...values, id: parseInt(id, 10) });
    if (!error) {
      navigate('/users');
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <h1>{id === 'create' ? 'Create User' : 'Edit User'}</h1>
      {error && <Alert type="error" message={error} />}
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
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = {
  createUserRequest,
  updateUserRequest,
  fetchUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
