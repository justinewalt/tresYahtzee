import React from 'react';
import { Route, Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { View } from 'react-native';

class ProtectedRoute extends React.Component {
  state = { canRedirect: false }

  componentDidMount() {
    this.setState({ canRedirect: true });
  }

  render() {
    let { canRedirect } = this.state;
    let { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <View>
        { canRedirect ?
          <Route {...rest} render={props => (
            isAuthenticated ? (
              <Component {...props}/>
            ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
            )
          )}/> : null
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let isAuthenticated = Object.keys(state.user).length ? true : false
  return { isAuthenticated }
}

export default connect(mapStateToProps)(ProtectedRoute);
