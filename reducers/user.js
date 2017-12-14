const user = ( state = {}, action ) => {
  switch(action.type) {
    case 'USER':
      return action.user;
    case 'LOGOUT':
      return {}
    case 'UPDATE_USER': 
      return {...state, nickname: action.nickname }
    default:
      return state;
  }
}

export default user;
