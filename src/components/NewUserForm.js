import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import useSavePage from '../hooks/useSavePage';

const NewUserForm = () => {
    const { id } = useParams();
    const {
        formData,
        handleChange,
        handleSubmit,
        isLoading,
        error,
        fetchUserData,
    } = useSavePage();

    useEffect(() => {
        if (id && id !== 'create') {
            fetchUserData(id);
        }
    }, [id, fetchUserData]);

    if (isLoading) {
        return <Spin size="large" />;
    }

    return (
        <div className="container">
            <h1>{id === 'create' ? 'Create User' : 'Edit User'}</h1>
            {error && <Alert type="error" message={error.message} />}
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} block>
                    {id && id !== 'create' ? 'Update' : 'Create'}
                </Button>
            </Form>
        </div>
    );
};

export default NewUserForm;
