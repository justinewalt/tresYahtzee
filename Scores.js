import React from 'react';
import { connect } from 'react-redux';
import { authHeaders } from './actions/auth';
import { BASE_URL } from './utils/url';
import { Text, List, ListItem, Left, Right, H1, Button, Body } from 'native-base';
import { View } from 'react-native';

class Scores extends React.Component {
  state = { show: 'All', scores: [] }

  componentDidMount() {
    let { user } = this.props;
    fetch(`${BASE_URL}/yahtzee_scores`, { headers: authHeaders(user) })
      .then( res => res.json() )
      .then( scores => this.setState({ scores }) )
  }

  toggleShow = () => {
    this.setState( (state) => { 
      return { show: state.show === 'All' ? 'My' : 'All' }
    });
  }

  filteredScores = () => {
    let { user } = this.props;
    let { show, scores } = this.state;
    let filtered = show === 'All' ? scores : scores.filter( s => s.email === user.email )
    return filtered.map( s => {
      let { created_at, nickname, score, id } = s;
      let date = new Date(created_at).toLocaleDateString();
      return (
        <ListItem key={id}>
          <Left>
            <Text>{score}</Text>
          </Left>
          <Body>
            <Text>{date}</Text>
            <Text note>{nickname}</Text>
          </Body>
        </ListItem>
      )
    });
  }

  render() {
    let { show } = this.state;
    return (
      <View>
        <H1 style={{ textAlign: 'center' }}>{show} Scores</H1>
        <Button block onPress={this.toggleShow}>
          <Text style={{ color: 'white' }}>
            { show === 'All' ? 'My Scores' : 'All Scores' }
          </Text>
        </Button>
        <List>
          { this.filteredScores() }
        </List>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Scores);
