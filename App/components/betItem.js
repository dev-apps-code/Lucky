import React, {Component} from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import Separator from '../components/separator';

export default class BetItem extends Component {
  componentDidMount() {}

  toMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 

  renderItem = (data) => {
    let {bet_amount, digit} = data.item;
    let {index} = data;
    let formattedAmount = this.toMoney(bet_amount)
    return (
      <View style={styles.mainContainer} key={index}>
        <View style={styles.subContainer}>
          <Text style={styles.digitText}>{digit}</Text>
          <Image
            style={styles.phpIcon}
            source={require('../assets/images/php.png')}
          />
          <Text style={styles.amountText}>{formattedAmount}</Text>
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
      let returnItem = item.bet_amount != '0' && item.bet_amount != null ? this.renderItem(data) : null;
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
    alignItems:'center'
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
    marginLeft: DEVICE_WIDTH * 0.02,
  },
  phpIcon: {
    marginLeft: DEVICE_WIDTH * 0.38,
    tintColor: '#6D9773',
    width: DEVICE_WIDTH * 0.04,
    resizeMode: 'contain',
  },

});
