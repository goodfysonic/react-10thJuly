import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    //withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getUsers = () => {
    return apiClient.get('/users', {
        params: {
            limit: 1000
        }
    });
};

export const createUser = ({ firstName, lastName }) => {
    return apiClient.post('/users', {
        firstName,
        lastName
    });
};

export const deleteUser = (userId) => {
    return apiClient.delete(`/users/${userId}`);
};
