import {Platform, Dimensions, StatusBar} from 'react-native';

const window = Dimensions.get('window');

export const DEVICE_WIDTH = window.width;
export const DEVICE_HEIGHT = window.height;

export const THEME_COLOR_1 = '#235463';
export const THEME_COLOR_1_MODAL = '#505d65';

export const BUTTON_GRADIENT_COLOR_1 = ['#66D5F7', '#0EAFE1'];

export const BOTTOM_TAB_ICON_HEIGHT = DEVICE_HEIGHT * 0.06;
export const BOTTOM_TAB_ICON_WIDTH = DEVICE_WIDTH * 0.06;
export const CHM_LOGO_WIDTH = DEVICE_WIDTH * 0.7
export const CHM_LOGO_HEIGHT = DEVICE_HEIGHT * 0.4;

export const GRADIENT_COLOR_SET_1 = {
  COLORS: ['#235463', '#909FA4'],
  LOCATIONS: [0, 0.5],
};
export const GRADIENT_COLOR_SET_2 = {
  COLORS: ['#0EAFE1', '#66D5F7'],
  LOCATIONS: [0, 0.5],
};

export const alpha = window.width / 375;
export const FONT_ALPHA = (window.width / 375) * 0.84;
