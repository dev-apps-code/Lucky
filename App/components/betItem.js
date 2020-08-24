import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import Separator from '../components/separator'

export default class BetItem extends Component {
  componentDidMount() {}

  render() {
    let {bet_amount, digit} = this.props.data.item;
    console.log(bet_amount)
    console.log(digit)
    return (
      <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
        <Text style={styles.digitText}>{digit}</Text>
        <Text style={styles.amountText}>{bet_amount}</Text>
        </View>
        <Separator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: DEVICE_HEIGHT * 0.07,
    width: DEVICE_WIDTH * 1,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderBottomColor: '#D7D7D7',
    // borderBottomWidth: 1,
  },
  subContainer: {
      flexDirection:'row',
      width: DEVICE_WIDTH * 0.95,
  },
  digitText: {
    fontSize: DEVICE_HEIGHT * 0.027,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
    marginLeft: DEVICE_WIDTH * 0.17
  },
  amountText: {
    fontSize: DEVICE_HEIGHT * 0.027,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
    marginLeft: DEVICE_WIDTH * 0.38
    
  },
});
