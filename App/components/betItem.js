import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import Separator from '../components/separator';

export default class BetItem extends Component {
  componentDidMount() {}

  renderItem = (data) => {
    let {bet_amount, digit} = data.item;
    let {index} = data;
    return (
      <View style={styles.mainContainer} key={index}>
        <View style={styles.subContainer}>
          <Text style={styles.digitText}>{digit}</Text>
          <Text style={styles.amountText}>{bet_amount}</Text>
        </View>
        <Separator />
      </View>
    );
  };

  renderItemList = (data) => {
    const list = data.map((item, index) => {
      let data = {
        item,
        index,
      };
      let returnItem = item.bet_amount > 0 ? this.renderItem(data) : null;
      // return <BetItem data={data} key={index} />;
      return returnItem;
    });

    return list;
  };

  render() {
    let {data} = this.props;
    return (
      this.renderItemList(data)
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: DEVICE_HEIGHT * 0.07,
    width: DEVICE_WIDTH * 1,
  },
  subContainer: {
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.95,
  },
  digitText: {
    fontSize: DEVICE_HEIGHT * 0.027,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
    marginLeft: DEVICE_WIDTH * 0.17,
  },
  amountText: {
    fontSize: DEVICE_HEIGHT * 0.027,
    color: '#0C3B2E',
    fontFamily: 'Alata-Regular',
    fontWeight: 'bold',
    marginLeft: DEVICE_WIDTH * 0.38,
  },
});
