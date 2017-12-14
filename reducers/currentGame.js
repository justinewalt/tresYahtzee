const scores = [
  { section: 'upper', name: 'Ones', score: null, value: 1 },
  { section: 'upper', name: 'Twos', score: null, value: 2 },
  { section: 'upper', name: 'Threes', score: null, value: 3 },
  { section: 'upper', name: 'Fours', score: null, value: 4 },
  { section: 'upper', name: 'Fives', score: null, value: 5 },
  { section: 'upper', name: 'Sixes', score: null, value: 6 },
  { section: 'lower', name: 'Three Of A Kind', score: null, addAll: true }, { section: 'lower', name: 'Four Of A Kind', score: null, addAll: true },
  { section: 'lower', name: 'Full House', score: null },
  { section: 'lower', name: 'Low Straight', score: null },
  { section: 'lower', name: 'High Straight', score: null },
  { section: 'lower', name: 'Yahtzee', score: null },
  { section: 'lower', name: 'Chance', score: null, addAll: true }
];

const currentGame = ( state = { scores, roll: 0, dice: [...new Array(5)], keep: [], completed: false }, action ) => {
  switch (action.type) {
    case 'RESET_ROLL':
      return {
        ...state,
        roll: 0,
        dice: [...new Array(5)],
        keep: [],
      }
    case 'ROLL_DICE':
      return {
        ...state,
        dice: action.dice,
        roll: state.roll + 1
      }
    case 'UPDATE_SCORE':
      return {
        ...state,
        scores: action.scores
      }
    case 'TOGGLE_KEPT':
     return {
       ...state,
       keep: action.keep
     }
    case 'NEW_GAME':
      return {
        scores: scores.map( s => { return { ...s, score: null } } ),
        roll: 0,
        dice: [...new Array(5)],
        keep: [],
        completed: false,
      }
    case 'COMPLETE_GAME':
      return {
        ...state,
        completed: true
      }
    default:
      return state;
  }
}

export default currentGame;

