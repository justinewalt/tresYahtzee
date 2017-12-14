import React from 'react';
import { updateScores, resetRoll } from './actions/mechanics';
import { singles, addAllDice, staticScore } from './utils/scoringEngine'
import { connect } from 'react-redux';
import { ListItem, Left, Right, Icon } from 'native-base';
import { Text } from 'react-native';

class ScoreRow extends React.Component {
  updateScore = (key) => {
    let { currentGame: { dice, scores }, dispatch } = this.props;
    let entry = scores.find( d => d.name === key );
    dispatch(resetRoll());

    if (entry.value)
      entry.score = singles(entry.value, dice)
    else if (entry.addAll)
      entry.score = addAllDice(entry.name, dice)
    else 
      entry.score = staticScore(entry.name, dice)

    let updatedScores = scores.map( (score) => {
      if (score.name === key)
        return entry
      return score
    });

    dispatch(updateScores(updatedScores))
  }

  render() {
    let { name, score, currentGame: { roll } } = this.props;
    return (
      <ListItem style={{ height: 50 }}>
        <Left>
          <Text>{name}</Text>
        </Left>
        <Right>
          { score !== null ?
            <Text>{score}</Text> :
            <Icon
              onPress={ roll !== 0 ? () => this.updateScore(name) : f => f }
              style={{ color: 'green' }}
              name="md-arrow-dropright-circle"
            />
          }
        </Right>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(ScoreRow);
