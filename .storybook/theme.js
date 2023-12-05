/**
 * .storybook/theme.js
 * Custom theme
 */
import { create } from '@storybook/theming'

export default create({
  base: 'light',

  colorPrimary: 'black',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'silver',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Arial", "Helvetica", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#eceece',
  barSelectedColor: 'LightSkyBlue',
  barBg: 'DarkSlateGrey',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  // branding
  brandTitle: 'Hackathon 2023'
})
