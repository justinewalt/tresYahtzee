import React from 'react';
import { Form, Item, Label, Input, Button } from 'native-base';
import { Text } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { auth } from './actions/auth';

class Register extends React.Component {
  state = { email: '', nickname: '', password: '', passwordConfirmation: '' }

  register = () => {
    let { nickname, email, password, passwordConfirmation } = this.state
    let { history, dispatch } = this.props;
    if (password === passwordConfirmation) {
      dispatch(auth({ nickname, email, password, passwordConfirmation }, '/auth', history));
    }
  }

  passwordsMatch = () => {
    let { password, passwordConfirmation } = this.state;
    return password === passwordConfirmation
  }

  handleChange = (type, val) => {
    this.setState({ [type]: val });
  }

  showButton = () => {
    let { email, nickname, password, passwordConfirmation } = this.state;
    let show = false;
    if (email.length && nickname.length && password.length && passwordConfirmation.length && this.passwordsMatch() )
      show = true;
    return show;
  }

  render() {
    let { nickname, email, password, passwordConfirmation} = this.state;
    return (
      <Form>
        { this.passwordsMatch() ? null : <Text>Password Do Not Match</Text> }
        <Item floatingLabel>
          <Label>Nickname</Label>
          <Input 
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (val) => this.handleChange('nickname', val) }
          />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input 
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (val) => this.handleChange('email', val) }
          />
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input 
            onChangeText={ (val) => this.handleChange('password', val) }
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </Item>
        <Item floatingLabel last>
          <Label>Password Confirmation</Label>
          <Input 
            onChangeText={ (val) => this.handleChange('passwordConfirmation', val) }
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </Item>
        { this.showButton() ?
          <Button primary block onPress={this.register}>
            <Text style={styles.loginButton}>Register</Text>
          </Button> : null
        }
        <Link to="/login">
          <Text style={styles.link}>Already have an account?</Text>
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

export default connect()(Register);
