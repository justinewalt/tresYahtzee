import React from 'react';
import { Form, Item, Label, Input, Button } from 'native-base';
import { Text } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { auth } from './actions/auth';

class Login extends React.Component {
  state = { email: '', password: '' }

  handleChange = (type, val) => {
    this.setState({ [type]: val });
  }

  authenticate = () => {
    let { email, password } = this.state;
    let { dispatch, history } = this.props;
    dispatch(auth({ email, password }, '/auth/sign_in', history))
  }

  render() {
    let { email, password } = this.state;
    return (
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (val) => this.handleChange('email', val) }
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (val) => this.handleChange('password', val) }
            secureTextEntry={true}
          />
        </Item>
        { (email.length > 0 && password.length > 0 ) &&
          <Button primary block onPress={this.authenticate}>
            <Text style={styles.loginButton}>Login</Text>
          </Button> 
        }
        <Link to="/register">
          <Text style={styles.link}>New User?</Text>
        </Link>
      </Form>
    )
  }

}

const styles = {
  link: {
    textAlign: 'center',
    paddingTop: 40,
  },
  loginButton: {
    color: 'white'
  }
}

export default connect()(Login);








