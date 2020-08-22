import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Button,
  FlatList
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/account';

//api
import {POST, GET} from '../../../api/service/service';
import {URL} from '../../../constants/apirUrls';

class Lastwo extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    data: new Array(100)
  });

  componentDidMount() {}

  renderItem = () => {
    <Text>test</Text>
  }

  render() {
    let {data} = this.state
    return (
      <View style={styles.mainContainer}>
          {/* <FlatList
            data={data}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addReleasesData()}
            onEndReachedThreshold={0.1}
            decelerationRate={0.5} 
            // ListFooterComponent={this.renderFooter.bind(this)}
          /> */}
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
  list : {

  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Lastwo);
