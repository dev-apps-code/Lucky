import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  BOTTOM_TAB_ICON_HEIGHT,
  BOTTOM_TAB_ICON_WIDTH,
  GRADIENT_COLOR_SET_2,
  THEME_COLOR_1,
} from '../constants/constants';

import LinearGradient from 'react-native-linear-gradient';

export default class BetTabs extends Component {
  componentDidMount() {}

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

          let textStyle = isFocused
            ? styles.activeTabText
            : styles.nonActiveTabText;

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabContainer}>
              <Text style={textStyle}>{label}</Text>

              <LinearGradient
                colors={GRADIENT_COLOR_SET_2.COLORS}
                locations={GRADIENT_COLOR_SET_2.LOCATIONS}
                style={isFocused ? styles.activeTabView : null}
              />
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
  tabContainer: {
    alignItems: 'center',
  },
  activeTabText: {
    fontSize: DEVICE_HEIGHT * 0.025,
    color: '#6D9773',
    fontFamily: 'Alata-Regular',
  },
  nonActiveTabText: {
    fontSize: DEVICE_HEIGHT * 0.025,
    color: '#D7D7D7',
    fontFamily: 'Alata-Regular',
  },
  tabView: {
    backgroundColor: '#FFFFFF',
    paddingTop: DEVICE_HEIGHT * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: DEVICE_WIDTH * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  activeTabView: {
    marginTop: DEVICE_HEIGHT * 0.01,
    borderBottomColor: '#6D9773',
    borderBottomWidth: 3,
    width: DEVICE_WIDTH * 0.1,
  },
});
