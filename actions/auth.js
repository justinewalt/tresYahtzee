import { BASE_URL } from '../utils/url';

export const authHeaders = (user) => {
  let { token, client, email } = user;
  return {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
		'token-type':   'Bearer',
    'access-token': token,
    'client':       client,
    'uid':          email
  }
}

export const logout = (user) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/auth/sign_out`, {
      method: 'DELETE',
      headers: authHeaders(user)
    }).then( () => dispatch({ type: 'LOGOUT' }) )
  }
}

export const auth = (user, endpoint, history) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/${endpoint}`, { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...user })
    }).then( res => res.json() )
      .then( user => { 
        if(!user.errors) {
          dispatch({ type: 'USER', user }) 
          history.push('/')
	}
      })
  }
}

