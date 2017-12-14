import React from 'react';
import ScoreSection from './ScoreSection';
import { resetRoll, updateScores } from './actions/mechanics';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-native-easy-grid';

class ScoreCard extends React.Component {
  componentDidUpdate() {
    this.checkEndGame();
  }

  checkEndGame = () => {
    let { currentGame: { scores }, endGame } = this.props;
    if (!scores.filter( s => s.score === null).length)
      endGame();
  }

  render() {
    return (
      <Grid>
        <Col>
          <ScoreSection label="Upper" />
        </Col>
        <Col>
          <ScoreSection label="Lower" />
        </Col>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(ScoreCard);
