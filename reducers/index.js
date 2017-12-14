import { combineReducers } from 'redux';
import user from './user';
import currentGame from './currentGame';

const rootReducer = combineReducers({
  user,
  currentGame,
});

export default rootReducer;
