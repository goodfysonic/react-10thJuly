import { Types } from '../actions/users';

const INITIAL_STATE = {
  items: [], 
  error: null, 
};

function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return { ...state, items: action.payload.items };
     
    case Types.FETCH_USER_SUCCESS:
      return { ...state, user: action.payload };
      
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

    case Types.UPDATE_USER_REQUEST:
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.payload.id
            ? { ...user, ...action.payload }
            : user
        )
      };
    
    default:
      return state;
  }
}

export default usersReducer;
