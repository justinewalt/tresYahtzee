import React from 'react';
import { View, Text } from 'react-native';
import Game from './Game';
import Player from './Player';

class Yahtzee extends React.Component {
  state = { edit: false }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !state.edit }
    });
  }

  render() {
    let { edit } = this.state;

    return (
      <View>
        { edit ? 
          <Player toggleEdit={this.toggleEdit} /> :
          <Game toggleEdit={this.toggleEdit} />
        }
      </View>
    )
  }

  


}

export default Yahtzee;








