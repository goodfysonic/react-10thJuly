import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';  

class NewUserForm extends Component {
  state = {
    firstName: '',
    lastName: ''
  };
  handleSubmit = (values) => {
    const { firstName, lastName } = values;
    this.props.onSubmit({
      firstName,
      lastName
    });
    this.formRef.current.resetFields();
  };
  formRef = React.createRef();  
  render() {
    return (
      <div className="container">
        <Form ref={this.formRef} onFinish={this.handleSubmit} layout="vertical">
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
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default NewUserForm;
