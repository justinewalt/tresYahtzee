import React from 'react';
import ScoreRow from './ScoreRow';
import { connect } from 'react-redux';
import { ListItem, List, H3, Left, Right } from 'native-base';
import { View, Text } from 'react-native';

const total = (score, label) => (
  <ListItem key={label}>
    <Left>
      <Text>{label}</Text>
    </Left>
    <Right>
      <Text>{score.toString()}</Text>
    </Right>
  </ListItem>
)

const generateTotals = (scores, label) => {
  const sectionScores = [];
  const sectionTotal = scores.filter( s => s.section === label.toLowerCase() ).reduce( (total, entry) => {
    
    let score = entry.score || 0;
    return total + score;
  }, 0);

  sectionScores.push(total(sectionTotal, label + ' Section Total'))

  if (label === 'Upper') {
    const bonus = sectionTotal >= 63 ? 35 : 0
    sectionScores.push(total(bonus, 'Bonus'))
    sectionScores.push(total(bonus + sectionTotal, label + ' Total Score'))
  }

  return sectionScores;
}

const ScoreSection = ({ label, currentGame: { scores } }) => (
  <View>
    <H3>{label} Section</H3>
    <List>
      { scores.filter( s => s.section === label.toLowerCase() )
          .map( (score,i) => {
            return (<ScoreRow key={i} {...score} />)
          })
      }
      { generateTotals(scores, label) }
    </List>
  </View>
)

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(ScoreSection);
