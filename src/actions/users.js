export const Types = {
    GET_USERS_REQUEST: 'users/get_users_request',
    GET_USERS_SUCCESS: 'users/get_users_success',
    DELETE_USER_REQUEST: 'users/delete_user_request',
    CREATE_USER_REQUEST: 'users/create_user_request',
    USERS_ERROR: 'users/user_error',
    UPDATE_USER_REQUEST: 'users/update_user_request',
    FETCH_USER_REQUEST: 'users/fetch_user_request',
    FETCH_USER_SUCCESS: 'users/fetch_user_success'
};

export const getUsersRequest = () => ({
    type: Types.GET_USERS_REQUEST
});

export const getUsersSuccess = ({ items }) => ({
    type: Types.GET_USERS_SUCCESS,
    payload: {
        items
    }
});

export const createUserRequest = ({ firstName, lastName }) => ({
    type: Types.CREATE_USER_REQUEST,
    payload: {
        firstName,
        lastName
    }
});

export const deleteUserRequest = (userId) => ({
    type: Types.DELETE_USER_REQUEST,
    payload: {
        userId
    }
});

export const usersError = ({ error }) => ({
    type: Types.USERS_ERROR,
    payload: {
        error
    }
});

export const updateUserRequest = ({ id, firstName, lastName }) => ({
    type: Types.UPDATE_USER_REQUEST,
    payload: {
        id,
        firstName,
        lastName
    }
});

export const fetchUserRequest = (userId) => ({
    type: Types.FETCH_USER_REQUEST,
    payload: userId
  });
  
  export const fetchUserSuccess = (user) => ({
    type: Types.FETCH_USER_SUCCESS,
    payload: user
  });
  
