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
import {login} from '../../redux/actions/account';

//api
import {POST, GET} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

import {store, retrieve} from '../../storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    email: 'user1@gmail.com',
    password: 'qqww1122',
  });

  // componentDidMount() {
  //   // this.initStorageData();

  //   //   const receiver = (response) => {
  //   //     console.log("response")
  //   //     console.log(response)
  //   //   };

  //   //   let data ={
  //   //     key: 'v',
  //   //     value: 'V',
  //   //   }

  //   //   store(data)
  //   //   retrieve(data.key, receiver)

  //   //  console.log("deputa")
  // }

  // initStorageData = () => {
  //   //callback
  //   const callbacks = (response) => {
  //     if (response) {
  //       //retreive data sets 
        
  //       let data = {
  //         key: 'bets_data',
          
  //       }
  //       retrieve()
  //     }
  //     else {
        
  //     }
  //   };

  //   //check if there is pending
  //   retrieve('pending', callbacks);
  // };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
