import { palette } from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',

  semiTransparentBorder: 'rgba(0, 0, 0, 0.5)', // based on light gray color

  lightColor: palette.lightColor,
  /**
   * The screen background.
   */
  screenBackground: palette.gray99,
  /**
   * White background.
   */
  whiteBackground: palette.white,

  /**
   * The main tinting color.
   */
  primary: palette.deepskyBlue,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.navyBlue,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: palette.white,
  /**
   * The default color of text in input fields.
   */
  darkText: palette.black,
  /**
   * Secondary information.
   */
  darkGrey: palette.darkGrey,
  green: palette.green,

  mediumGrey: palette.mediumGrey,

  dim: palette.lightGrey,

  placeholder: palette.lightGrey,

  shadow: palette.lighterGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,
  /**
   * Tag color.
   */
  purple: palette.purple,

  disable: palette.lighterGrey,

  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',

  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',

  yellow600: '#ca8a04',
  yellow400: '#fbbf24',
  yellow300: '#fcd34d',
  gray900: '#111827',
  gray800: '#1f2937',
  gray700: '#374151',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  gray50: '#f9fafb',
};
