import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const CustomModal = ({ isOpen, handleClose, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const handleFormSubmit = (values) => {
        onSubmit(values);
        form.resetFields();
        handleClose();
    };

    return (
        <Modal visible={isOpen} onCancel={handleClose} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input the first name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input the last name!' }]}>
                    <Input />
                </Form.Item>
                {initialValues && (
                    <Form.Item name="id" label="ID" hidden>
                        <Input />
                    </Form.Item>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CustomModal;
