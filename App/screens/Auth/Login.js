import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Button,
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
import {POST, GET} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    email: 'user1@gmail.com',
    password: 'qqww1122',
  });

  onPressLogin = () => {
    let {email, password} = this.state;
    let data = {email, password};
    let url = URL.LOGIN;

    const receiver = (response) => {
      let {status} = response;
      if (status) {
        let authToken = response.access_token;
        let user_id = response.user_id;
        let propData = {...data, user_id, authToken}
        this.props.login(propData);
        this.props.navigation.navigate('Main')
      }
      else {
        alert("invalid credentials")
      }
    };

    let payload = {
      data,
      url,
      receiver,
    };
    POST(payload);
  };

  componentDidMount() {}

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
          <GradientButton
            buttonColor={GRADIENT_COLOR_SET_2}
            buttonText={'Sign In'}
            buttonTextColor={'#FFFFFF'}
            marginBottom={DEVICE_HEIGHT * 0.01}
            buttonPress={this.onPressLogin}
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
    login: (payload) => dispatch(login(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
