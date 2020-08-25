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
  ScrollView,
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/account';

//api
import {POST, GET} from '../../../api/service/service';
import {URL} from '../../../constants/apirUrls';

//storage
import {store, retrieve} from '../../../storage';
import BetItem from '../../../components/betItem';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../constants/constants';
import Modal, {ModalContent} from 'react-native-modal';

class Suertres extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    data: [],
    loading: true,
    modalVisible: false,
    inputDigit: null,
    inputAmount: null,
  });

  componentDidMount() {
    this._isMounted = true;
    this._isMounted ? this.initData() : null;

    //cheat code force restart data
    // this._isMounted = true;
    // this._isMounted ? this.createData() : null;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initData = () => {
    console.log('initializing s3 data...');
    //callback
    const s3Callback = (data) => {
      if (data) {
        console.log('Succeeding Launch');
        this.retrieveData(data);
      } else {
        console.log('First Launch');
        this.createData();
      }
    };

    //check if first time
    retrieve('s3', s3Callback);
  };

  createData = () => {
    //the data pool for lastwo
    let arr = [];
    for (let i = 0; i < 1000; ++i) {
      let digit = i < 10 ? '0' + i.toString() : i.toString();

      // testing
      // if (digit == '44') {
      //   arr.push({digit, bet_amount: 4444});
      // }
      // if (digit == '23') {
      //   arr.push({digit, bet_amount: 32143123});
      // }

      // if (digit == '65') {
      //   arr.push({digit, bet_amount: 42526});
      // }
      // if (digit == '78') {
      //   arr.push({digit, bet_amount: 441344});
      // }
      arr.push({digit, bet_amount: null});
    }
    arr;
    let JSONarr = JSON.stringify(arr);
    //async storage configuration lastwo
    let data = {
      key: 's3',
      value: JSONarr,
    };
    store(data);

    this.setState({
      data: arr,
      loading: false,
    });
  };

  retrieveData = (data) => {
    this.setState({
      data: JSON.parse(data),
      loading: false,
    });
  };

  modifyData = () => {
    let {inputAmount, inputDigit, data} = this.state;
    let index = inputDigit.replace(/^0+/, '');
    data[index].digit = inputDigit;
    data[index].bet_amount = inputAmount;
    let modifiedData = {
      key: 's3',
      value: JSON.stringify(data),
    };
    store(modifiedData);
    this.setState({
      inputAmount: null,
      inputDigit: null,
      modalVisible: false,
    });
  };

  itemPressed = (item, index) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      selectedIndex: index,
    });
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  onChangeDigit = (value) => {
    let {data} = this.state;
    this.setState({
      inputDigit: value,
    });

    if (value.length > 1) {
      let index = value.replace(/^0+/, '');
      let amount = data[index].bet_amount;
      if (amount) {
        this.setState({
          inputAmount: amount,
        });
      } else {
        this.setState({
          inputAmount: null,
        });
      }
    } else {
      this.setState({
        inputAmount: null,
      });
    }
  };

  onChangeAmount = (value) => {
    let amount = this.toMoney(value);
    this.setState({
      inputAmount: amount,
    });
  };
  onPressSave = () => {
    let {inputDigit, inputAmount} = this.state;
    inputDigit.length >= 3 && inputAmount ? this.modifyData() : alert('Insufficient Input')  
  };

  toMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  renderModifyModal = () => {
    let {inputDigit, inputAmount} = this.state;
    return (
      <View style={styles.modifyView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => this.onPressClose()}>
          <Image
            style={styles.closeIcon}
            source={require('../../../assets/images/close.png')}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', width: DEVICE_WIDTH * 0.7}}>
          <View style={styles.modifySubView}>
            <TextInput
              style={[styles.input, {width: DEVICE_WIDTH * 0.15}]}
              keyboardType={'number-pad'}
              maxLength={3}
              value={inputDigit}
              onChangeText={(text) => this.onChangeDigit(text)}
              ref={(input) => {
                this.textInput = input;
              }}
            />
            <Text style={styles.inputLabelText}>Digit</Text>
          </View>
          <View style={styles.modifySubView}>
            <TextInput
              style={[styles.input, {width: DEVICE_WIDTH * 0.3}]}
              keyboardType={'number-pad'}
              value={inputAmount}
              onChangeText={(text) => this.onChangeAmount(text)}
              ref={(input) => {
                this.textInput = input;
              }}
            />
            <Text style={styles.inputLabelText}>Amount</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() => this.onPressSave()}>
          <Image
            style={styles.modifyIcon}
            source={require('../../../assets/images/edit.png')}
          />
          <Text style={styles.modifyButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onPressClose = () => {
    this.toggleModal();
  };

  render() {
    let {data, loading, modalVisible} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.optionsView}>
          <TouchableOpacity onPress={() => this.toggleModal()}>
            <Image
              style={styles.addIcon}
              source={require('../../../assets/images/add.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>Digit</Text>
          <Text style={styles.typeText}>Amount</Text>
        </View>
        <View style={styles.listContainer}>
          <ScrollView>
            {!loading ? (
              <BetItem data={data} />
            ) : (
              <ActivityIndicator size="large" color="#FFBA00" />
            )}
          </ScrollView>
        </View>
        {!loading && (
          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => this.onPressClose()}
            hideModalContentWhileAnimating={true}>
            {this.renderModifyModal()}
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
    backgroundColor: 'rgb(228, 228, 228)',
  },
  modifyView: {
    height: DEVICE_HEIGHT * 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: DEVICE_HEIGHT * 0.03,
  },
  modifyButton: {
    height: DEVICE_HEIGHT * 0.08,
    width: DEVICE_WIDTH * 0.6,
    borderRadius: 5,
    backgroundColor: '#6D9773',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.05,
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
    marginRight: DEVICE_WIDTH * 0.03,
  },
  typeContainer: {
    flexDirection: 'row',
    height: DEVICE_HEIGHT * 0.06,
    marginTop: DEVICE_HEIGHT * 0.01,
    width: DEVICE_WIDTH * 0.95,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.03,
    borderTopRightRadius: DEVICE_HEIGHT * 0.03,
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
  },
  listContainer: {
    maxHeight: DEVICE_HEIGHT * 0.68,
    width: DEVICE_WIDTH * 0.95,
    borderBottomLeftRadius: DEVICE_HEIGHT * 0.03,
    borderBottomRightRadius: DEVICE_HEIGHT * 0.03,
    backgroundColor: '#FFFFFF',
    paddingVertical: DEVICE_HEIGHT * 0.02,
  },
  optionsView: {
    height: DEVICE_HEIGHT * 0.07,
    width: DEVICE_WIDTH * 1,
    backgroundColor: 'white',
    paddingHorizontal: DEVICE_WIDTH * 0.025,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  typeText: {
    fontSize: DEVICE_HEIGHT * 0.03,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
  },

  addIcon: {
    tintColor: '#6D9773',
    width: DEVICE_WIDTH * 0.07,
    resizeMode: 'contain',
  },

  closeIcon: {
    tintColor: '#6D9773',
    width: DEVICE_WIDTH * 0.07,
    resizeMode: 'contain',
  },

  input: {
    width: DEVICE_WIDTH * 0.1,
    borderBottomWidth: 1,
    borderBottomColor: '#6D9773',
    fontSize: DEVICE_HEIGHT * 0.05,
    height: DEVICE_HEIGHT * 0.07,
    padding: 0,
    textAlign: 'center',
  },

  inputLabelText: {
    fontSize: DEVICE_HEIGHT * 0.03,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
  },

  modifySubView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_WIDTH * 0.3,
  },

  closeButton: {
    position: 'absolute',
    right: DEVICE_WIDTH * -0.01,
    top: DEVICE_HEIGHT * -0.01,
    backgroundColor: '#FFFFFF',
    borderRadius: DEVICE_HEIGHT * 0.1,
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Suertres);
