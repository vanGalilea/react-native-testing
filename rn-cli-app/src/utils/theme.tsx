import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type ThemeType = 'dark' | 'light';
type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
};
const ThemeContext = createContext<ThemeContextType | null>(null);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme should be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({
  initialTheme = 'light',
  ...props
}: {
  initialTheme: ThemeType;
  children: React.ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useState(initialTheme);
  return <ThemeContext.Provider value={{theme, setTheme}} {...props} />;
};

export {useTheme, ThemeProvider};
