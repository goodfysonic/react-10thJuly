import { Types } from '../actions/users';

const INITIAL_STATE = {
  items: [], 
};

function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return { ...state, items: action.payload.items };

    case Types.CREATE_USER_REQUEST:
        const newUser = { ...action.payload, id: Math.random() };
        return { ...state, items: [newUser, ...state.items] };
    
    case Types.DELETE_USER_REQUEST:
      return {
        ...state,
        items: state.items.filter(user => user.id !== action.payload.userId)
      };

    case Types.USERS_ERROR:
    return { ...state, error: action.payload.error };

    default:
      return state;
  }
}

export default usersReducer;
