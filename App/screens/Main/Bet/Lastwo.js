import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Button,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/account';

//api
import {POST, GET} from '../../../api/service/service';
import {URL} from '../../../constants/apirUrls';

//storage
import {store, retrieve} from '../../../storage';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../constants/constants';
import Modal, {SlideAnimation, ModalContent} from 'react-native-modals';

class Lastwo extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    data: [],
    loading: true,
    modalVisible: false,
    selectedIndex: 0,
  });

  componentDidMount() {
    this._isMounted = true;
    this._isMounted ? this.initData() : null;

    //cheat code force restart data
    // this.createInitialData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initData = () => {
    console.log('initializing l2 data...');
    //callback
    const l2Callback = (data) => {
      if (data) {
        console.log('Succeeding Launch');
        //retreive data sets
        this.setState({
          data: JSON.parse(data),
          loading: false,
        });
      } else {
        console.log('First Launch');
        this.createInitialData();
      }
    };

    //check if first time
    retrieve('l2', l2Callback);
  };

  createInitialData = () => {
    //the data pool for lastwo
    let arr = [];
    for (let i = 0; i < 100; ++i) {
      let digit = i < 10 ? '0' + i.toString() : i.toString();

      arr.push({digit, bet_amount: 0});
    }
    let JSONarr = JSON.stringify(arr);
    //async storage configuration lastwo
    let data = {
      key: 'l2',
      value: JSONarr,
    };
    store(data);

    this.setState({
      data: arr,
      loading: false,
    });
  };

  itemPressed = (item, index) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      selectedIndex: index,
    });
  };

  renderItem = ({item, index}) => {
    // console.log(item)
    return (
      <View style={styles.digitContainer}>
        <Text style={styles.digit}>{item.digit} : </Text>
        <TouchableOpacity
          onPress={() => this.itemPressed(item, index)}
          style={styles.betContainer}>
          <Text style={styles.bet}> {item.bet_amount}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  renderModifyModal = () => {
    let {selectedIndex, data} = this.state;
    let selected = data[selectedIndex];
    let betAmount = selected.bet_amount;
    let digit = selected.digit;
    return (
      <View style={styles.modifyView}>
        <View style={styles.modifyDigitView}>
          <Text style={styles.modifyText}>{digit}</Text>
          <Text>Digit</Text>
        </View>
        <View style={styles.modifyAmountView}>
          <Text style={styles.modifyText}>{betAmount}000000</Text>
          <Text>Total Bet Amount</Text>
        </View>
        <TouchableOpacity style={styles.modifyButton}>
          <Image
            style={styles.modifyIcon}
            source={require('../../../assets/images/edit.png')}
          />
          <Text style={styles.modifyButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let {data, loading, modalVisible} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
          {!loading ? (
            <FlatList
              renderItem={this.renderItem}
              data={data}
              // style={styles.listContainer}
              refreshing={loading}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
            />
          ) : (
            <ActivityIndicator size="large" color="#FFBA00" />
          )}
        </View>
        {!loading && (
          <Modal
            visible={modalVisible}
            onTouchOutside={() => {
              this.toggleModal();
            }}>
            <ModalContent>{this.renderModifyModal()}</ModalContent>
          </Modal>
        )}
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
  listContainer: {
    height: DEVICE_HEIGHT * 0.75,
    width: DEVICE_WIDTH * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digit: {
    fontSize: DEVICE_HEIGHT * 0.025,
    color: '#6D9773',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
  },
  bet: {
    fontSize: DEVICE_HEIGHT * 0.025,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
  },
  betContainer: {
    borderBottomColor: '#6D9773',
    // borderLeftColor: '#6D9773',
    // borderLeftWidth:1,
    borderBottomWidth: 1,
    flex: 1,
  },
  digitContainer: {
    // flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    width: DEVICE_WIDTH * 0.23,
    marginBottom: DEVICE_HEIGHT * 0.03,
    marginRight: DEVICE_WIDTH * 0.015,
    // justifyContent: 'center',
    paddingRight: DEVICE_WIDTH * 0.02,
  },
  modalMain: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modifyView: {
    height: DEVICE_HEIGHT * 0.5,
    width: DEVICE_WIDTH * 0.85,
  },
  modifyDigitView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifyAmountView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modifyText: {
    fontSize: DEVICE_HEIGHT * 0.1,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
  },
  modifyButton: {
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_WIDTH * 0.85,
    borderRadius: 5,
    backgroundColor: '#6D9773',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  modifyButtonText: {
    fontSize: DEVICE_HEIGHT * 0.025,
    color: '#FFFFFF',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
  },
  modifyIcon: {
    tintColor: '#FFFFFF',
    width: DEVICE_WIDTH * 0.07,
    resizeMode: 'contain',
    marginRight: DEVICE_WIDTH * 0.03
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
