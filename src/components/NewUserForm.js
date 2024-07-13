import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUserRequest, updateUserRequest } from '../actions/users';

const NewUserForm = ({ users, createUserRequest, updateUserRequest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id === parseInt(id, 10));
      if (user) {
        formRef.current.setFieldsValue(user);
        setIsEditing(true);
      }
    }
  }, [id, users]);

  const handleSubmit = (values) => {
    if (isEditing) {
      updateUserRequest({
        id: parseInt(id, 10),
        ...values,
      });
    } else {
      createUserRequest(values);
    }
    formRef.current.resetFields();
    navigate('/');
  };

  return (
    <div className="container">
      <Form ref={formRef} onFinish={handleSubmit} layout="vertical">
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
});

const mapDispatchToProps = {
  createUserRequest,
  updateUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
