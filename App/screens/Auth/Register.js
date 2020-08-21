import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  ImageBackground,
} from 'react-native';
import {
  LOGIN_BG,
  CHM_LOGO_HEIGHT,
  CHM_LOGO_WIDTH,
  GRADIENT_COLOR_SET_2,
  DEVICE_HEIGHT,
} from '../../constants/constants';

import CMH from '../../assets/svg/CMH_LOGO';
import GradientButton from '../../components/GradientButton';
import Input from '../../components/Input';

//redux
import {connect} from 'react-redux';
import {login} from '../../redux/actions/account';

//api
import {POST} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    email: '',
    password: '',
    retypePassword: '',
  });

  onPressRegister = () => {
    if (!this.isPasswordMatch()) {
      alert('Password Mismatch');
      return;
    }

    let {email, password} = this.state;
    let data = {email, password};
    let url = URL.REGISTER;

    const receiver = (response) => {
      console.log('Response:');
      console.log(response);
      alert("Registered")
      this.props.navigation.navigate('Login')
    };

    let payload = {
      data,
      url,
      receiver,
    };
    POST(payload);
  };

  isPasswordMatch = () => {
    let {password, retypePassword} = this.state;
    let match = password === retypePassword ? true : false;
    return match;
  };

  email = (input) => {
    console.log(input);
    this.setState({
      email: input,
    });
  };

  password = (input) => {
    console.log(input);
    this.setState({
      password: input,
    });
  };

  retypePassword = (input) => {
    console.log(input);
    this.setState({
      retypePassword: input,
    });
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={LOGIN_BG} style={styles.ImageBackground}>
          <CMH width={CHM_LOGO_WIDTH} height={CHM_LOGO_HEIGHT} />
          <Input
            borderColor={'#FFFFFF'}
            placeHolder={'Email address'}
            inputUpdate={this.email}
            marginBottom={DEVICE_HEIGHT * 0.03}
          />
          <Input
            borderColor={'#FFFFFF'}
            placeHolder={'Password'}
            inputUpdate={this.password}
            security={true}
            marginBottom={DEVICE_HEIGHT * 0.03}
          />
          <Input
            borderColor={'#FFFFFF'}
            placeHolder={'Verify Password'}
            inputUpdate={this.retypePassword}
            security={true}
            marginBottom={DEVICE_HEIGHT * 0.03}
          />
          <GradientButton
            buttonColor={GRADIENT_COLOR_SET_2}
            buttonText={'Sign Up'}
            buttonTextColor={'#FFFFFF'}
            marginBottom={DEVICE_HEIGHT * 0.01}
            buttonPress={this.onPressRegister}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account,
    isLogin: state.accountReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
