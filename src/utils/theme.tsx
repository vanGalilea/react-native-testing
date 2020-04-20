import React, {createContext, useContext} from 'react'

const ThemeContext = createContext(null)

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme should be used within a ThemeProvider')
  }
  return context
}

function ThemeProvider({initialTheme = 'light', ...props}) {
  const [theme, setTheme] = React.useState(initialTheme)
  // @ts-ignore
  return <ThemeContext.Provider value={[theme, setTheme]} {...props} />
}

export {useTheme, ThemeProvider}
