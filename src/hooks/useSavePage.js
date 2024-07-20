import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser, fetchUser } from '../api/users'; 

const useSavePage = (initialData = {}) => {
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = useCallback((name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (formData.id) {
                await updateUser(formData);
            } else {
                await createUser(formData);
            }
            navigate('/users');
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [formData, navigate]);

    const fetchUserData = async (id) => {
        setIsLoading(true);
        try {
            const userData = await fetchUser(id);
            setFormData(userData);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isLoading,
        error,
        fetchUserData,
    };
};

export default useSavePage;
