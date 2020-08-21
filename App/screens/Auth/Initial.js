import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {
  LOGIN_BG,
  CHM_LOGO_HEIGHT,
  CHM_LOGO_WIDTH,
  GRADIENT_COLOR_SET_2,
  DEVICE_HEIGHT,
} from '../../constants/constants';
import NormalButton from '../../components/NormalButton';
import GradientButton from '../../components/GradientButton';

import CMH from '../../assets/svg/CMH_LOGO';

export default class Initial extends Component {

  onPressRegister = () => {
    this.props.navigation.navigate('Register');
  };

  onPressLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={LOGIN_BG} style={styles.ImageBackground}>
          <CMH
            width={CHM_LOGO_WIDTH}
            height={CHM_LOGO_HEIGHT + DEVICE_HEIGHT * 0.3}
          />
          {/* logo */}
          <GradientButton
            buttonColor={GRADIENT_COLOR_SET_2}
            buttonText={'Sign In'}
            buttonTextColor={'#FFFFFF'}
            marginBottom={DEVICE_HEIGHT * 0.01}
            buttonPress={this.onPressLogin}
          />
          <NormalButton
            buttonColor={'transparent'}
            buttonText={'Sign Up'}
            buttonTextColor={'#FFFFFF'}
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
