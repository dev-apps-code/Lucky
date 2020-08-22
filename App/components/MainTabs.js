import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import HomeActive from '../assets/svg/Home.svg';
import HomeInactive from '../assets/svg/Home - Inactive.svg';
import CategoriesActive from '../assets/svg/Categories.svg';
import CategoriesInactive from '../assets/svg/Categories - Inactive.svg';
import SearchActive from '../assets/svg/Search.svg';
import SearchInactive from '../assets/svg/Search - Inactive.svg';
import LibraryActive from '../assets/svg/Library.svg';
import LibraryInactive from '../assets/svg/Library - Inactive.svg';
import Settings from '../assets/svg/Settings';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  BOTTOM_TAB_ICON_HEIGHT,
  BOTTOM_TAB_ICON_WIDTH,
  THEME_COLOR_1,
} from '../constants/constants';

export default class MainTabs extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false,
    });
  }

  tabIcons(isFocused, tabID) {
    switch (tabID) {
      case 0:
        return isFocused ? (
          <Image
            style={styles.activeIcon}
            source={require('../assets/images/account.png')}
          />
        ) : (
          <Image
            style={styles.inactiveIcon}
            source={require('../assets/images/account.png')}
          />
        );
      case 1:
        return isFocused ? (
          <Image
            style={styles.activeIcon}
            source={require('../assets/images/bet.png')}
          />
        ) : (
          <Image
            style={styles.inactiveIcon}
            source={require('../assets/images/bet.png')}
          />
        );
      case 2:
        return isFocused ? (
          <Image
            style={styles.activeIcon}
            source={require('../assets/images/send.png')}
          />
        ) : (
          <Image
            style={styles.inactiveIcon}
            source={require('../assets/images/send.png')}
          />
        );
      case 3:
        return isFocused ? (
          <Image
            style={styles.activeIcon}
            source={require('../assets/images/history.png')}
          />
        ) : (
          <Image
            style={styles.inactiveIcon}
            source={require('../assets/images/history.png')}
          />
        );
      default:
    }
  }

  render() {
    let {state, descriptors, navigation} = this.props;
    return (
      <View style={styles.tabView}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              style={styles.iconContainer}
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              {this.tabIcons(isFocused, index)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsButton: {
    height: DEVICE_HEIGHT * 0.04,
    width: DEVICE_HEIGHT * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DEVICE_WIDTH * 0.03,
  },
  inactiveIcon: {
    tintColor: '#D7D7D7',
    width: DEVICE_WIDTH * 0.07,
    resizeMode: 'contain',
  },
  activeIcon: {
    tintColor: '#6D9773',
    width: DEVICE_WIDTH * 0.07,
    resizeMode: 'contain',
  },
  iconContainer: {
    // backgroundColor: '#F0F0F0',
    height: DEVICE_WIDTH * 0.15,
    width: DEVICE_WIDTH * 0.15,
    borderRadius: DEVICE_WIDTH * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabView: {
    paddingVertical: DEVICE_HEIGHT * 0.01,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: DEVICE_WIDTH * 0.01,
    borderTopWidth: DEVICE_HEIGHT * 0.001,
    borderTopColor: '#F0F0F0',
  },
});
