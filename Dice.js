import React from 'react';
import { Text } from 'react-native'
import d1 from './images/d1.png';
import d2 from './images/d2.png';
import d3 from './images/d3.png';
import d4 from './images/d4.png';
import d5 from './images/d5.png';
import d6 from './images/d6.png';
import { toggleKept } from './actions/mechanics';
import { connect } from 'react-redux';
import { Thumbnail, Button } from 'native-base';

const images = { d1, d2, d3, d4, d5, d6 }

const styles = {
  kept: {
    borderColor: 'blue',
    borderWidth: 2,
  }
}

const Dice = ({ value, index, dispatch, currentGame: { keep } }) => (
  <Button
    transparent
    onPress={ () => dispatch(toggleKept(keep, index))}
  >
    <Thumbnail
      style={ keep.includes(index) ? styles.kept : {} }
      square
      source={images[`d${value}`]}
      onPress={ () => dispatch(toggleKept(keep, index)) }
    />
  </Button>
)

const mapStateToProps = (state) => {
   return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(Dice);








