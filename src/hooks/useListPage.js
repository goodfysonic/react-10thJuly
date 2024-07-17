import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useListPage = (apiConfig, params = {}) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(apiConfig.getlist, {
                params: {
                    ...params,
                    _page: pagination.current,
                    _limit: pagination.pageSize
                },
            });
            if (response.data && Array.isArray(response.data.data)) {
                setData(response.data.data);
                setPagination(prev => ({
                    ...prev,
                    total: parseInt(response.headers['x-total-count'], 10) || response.data.total
                }));
            } else {
                throw new Error('Expected data to be an array.');
            }
        } catch (err) {
            console.error('Fetch data error:', err);
            setError(err);  
        }
    }, [apiConfig.getlist, params, pagination]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const editUser = async (userId, userData) => {
        try {
            await axios.put(`${apiConfig.getlist}/${userId}`, userData);
            fetchData();  // Refresh data after update
        } catch (err) {
            setError(err);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${apiConfig.getlist}/${userId}`);
            fetchData();  // Refresh data after delete
        } catch (err) {
            setError(err);
        }
    };

    return {
        data,
        pagination,
        error,
        editUser,
        deleteUser,
        setPagination,
        fetchData,
    };
};

export default useListPage;
