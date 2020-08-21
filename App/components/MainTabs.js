import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
      title: null,
      headerShown: true,
      headerStyle: {
        backgroundColor: THEME_COLOR_1,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerRight: ({navigate}) => (
        <TouchableOpacity
          // onPress={this.onPressSettings}
          style={styles.settingsButton}>
          <Settings
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        </TouchableOpacity>
      ),
      headerLeft: null,
    });
  }

  tabIcons(isFocused, tabID) {
    switch (tabID) {
      case 0:
        return isFocused ? (
          <HomeActive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        ) : (
          <HomeInactive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        );
      case 1:
        return isFocused ? (
          <SearchActive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        ) : (
          <SearchInactive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        );
      case 2:
        return isFocused ? (
          <CategoriesActive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        ) : (
          <CategoriesInactive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        );
      case 3:
        return isFocused ? (
          <LibraryActive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
          />
        ) : (
          <LibraryInactive
            width={BOTTOM_TAB_ICON_WIDTH}
            height={BOTTOM_TAB_ICON_HEIGHT}
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
              if (index == 0) {
                this.props.navigation.setOptions({
                  title: null,
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: THEME_COLOR_1,
                    elevation: 0,
                    shadowOpacity: 0,
                  },
                  headerRight: ({navigate}) => (
                    <TouchableOpacity
                      // onPress={this.onPressSettings}
                      style={styles.settingsButton}>
                      <Settings
                        width={BOTTOM_TAB_ICON_WIDTH}
                        height={BOTTOM_TAB_ICON_HEIGHT}
                      />
                    </TouchableOpacity>
                  ),
                  headerLeft: null,
                });
              } else {
                navigation.setOptions({
                  headerShown: false,
                });
              }
              // index == 3
              //   ? navigation.setOptions({
              //       headerShown: false,
              //     })
              //   : navigation.setOptions({
              //       title: null,
              //       headerShown: true,
              //       headerStyle: {
              //         backgroundColor: THEME_COLOR_1,
              //         elevation: 0,
              //         shadowOpacity: 0,
              //       },
              //       headerRight: ({navigate}) => (
              //         <TouchableOpacity
              //           // onPress={this.onPressSettings}
              //           style={styles.settingsButton}>
              //           <Settings
              //             width={BOTTOM_TAB_ICON_WIDTH}
              //             height={BOTTOM_TAB_ICON_HEIGHT}
              //           />
              //         </TouchableOpacity>
              //       ),
              //       headerLeft: null,
              //     });
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
  iconButton: {
    borderRadius: 50,
    borderWidth: 2,
    height: DEVICE_HEIGHT * 0.03,
    width: DEVICE_HEIGHT * 0.03,
  },
  tabView: {
    backgroundColor: 'black',
    paddingVertical: DEVICE_HEIGHT * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: DEVICE_WIDTH * 0.01,
  },
});
