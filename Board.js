import React from 'react';
import Dice from './Dice';
import { resetRoll, newGame, rollDice } from './actions/mechanics';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Body } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

const Board = ({ dispatch, currentGame: { roll, dice, keep } }) => {
  let maxRoll = roll === 3;
  let disabled = maxRoll ? { disabled: true } : {}

  return (
    <View>
      { roll > 0 &&
        <Grid>
          { dice.map( (d, i) => {
              return (
                <Col style={styles.dice} key={i}>
                  <Body>
                    <Dice index={i} value={d} />
                  </Body>
                </Col>
              )
            })
          }
        </Grid>
      }
      <Button
        {...disabled}
        block
        onPress={ () => dispatch(rollDice(dice, keep)) }
      >
        <Text>
          { maxRoll ? 'Score Roll' : 'Roll' }
        </Text>
      </Button>
    </View>
  )
}

const styles = { 
  dice: {
    marginBottom: 5,
    marginTop: 5
  }
}

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(Board);
