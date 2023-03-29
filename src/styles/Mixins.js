import { Dimensions, PixelRatio } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

/**
 * Scale based on width
 * @param size
 */
export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

/**
 * Scale font size
 * @param size
 */
export const scaleFont = size => size * PixelRatio.getFontScale();

/**
 * Get styles dimensions for margin or padding
 * @param top {number} top margin
 * @param right {number} right margin
 * @param bottom {number} bottom margin
 * @param left {number} left margin
 * @param property {'margin' | 'padding'} dimension type
 */
function dimensions(top, right, bottom, left = right, property) {
  const styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

/**
 * Get styles for margin
 * @param top {number} top margin
 * @param right {number} right margin
 * @param bottom {number} bottom margin
 * @param left {number} left margin
 */
export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

/**
 * Get styles for padding
 * @param top {number} top padding
 * @param right {number} right padding
 * @param bottom {number} bottom padding
 * @param left {number} left padding
 */
export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

/**
 * Get box shadow style object
 * @param color {string} box shadow color
 * @param offset { width: number; height: number } box shadow offset
 * @param radius {number} box shadow radius
 * @param opacity {number} box shadow opacity
 */

export const boxShadow = ({
  color,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
}) => ({
  shadowColor: color,
  shadowOffset: offset,
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: radius,
});
