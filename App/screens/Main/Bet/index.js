import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Button,
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/account';

//api
import {POST, GET} from '../../../api/service/service';
import {URL} from '../../../constants/apirUrls';

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    email: 'user1@gmail.com',
    password: 'qqww1122',
  });

  componentDidMount() {}


  render() {
    return (
      <View style={styles.mainContainer}>
          <Text>2</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(Bet);
