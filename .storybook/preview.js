import theme from './theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    theme
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
