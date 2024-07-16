import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getUsers = () => {
    return apiClient.get('/users');
};

export const createUser = (userData) => {
    return apiClient.post('/users', userData);
};

export const deleteUser = (userId) => {
    return apiClient.delete(`/users/${userId}`);
};

export const updateUser = ({ id, firstName, lastName }) => {
    return apiClient.put(`/users/${id}`, {
        firstName,
        lastName
    });
};

export const fetchUser = (userId) => {
    return apiClient.get(`/users/${userId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
};
