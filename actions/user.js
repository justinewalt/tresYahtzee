import { BASE_URL } from '../utils/url';
import { authHeaders } from './auth';

export const updateUser = (nickname, user) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/auth`, {
      method: 'PUT',
      headers: authHeaders(user),
      body: JSON.stringify({ nickname }),
    }).then( () => dispatch({ type: 'UPDATE_USER', nickname }) )
  }
}
