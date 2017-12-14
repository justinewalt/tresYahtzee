import { BASE_URL } from '../utils/url';
import { authHeaders } from './auth';

export const postScore = (user, score) => {
  return(dispatch) => {
    let value = score;
    fetch(`${BASE_URL}/yahtzee_scores`, {
      method: 'POST',
      headers: authHeaders(user),
      body: JSON.stringify({ score: { value } })
    }).then( dispatch({type: 'COMPLETE_GAME'}) );
  }
}