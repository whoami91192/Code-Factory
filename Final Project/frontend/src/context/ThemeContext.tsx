import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, Theme } from '@mui/material/styles';

export interface CustomTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
  success: string;
  error: string;
}

const defaultThemes: CustomTheme[] = [
  {
    id: 'food',
    name: 'Food Tomato',
    primary: '#E53935', // Tomato red
    secondary: '#66BB6A', // Fresh green
    accent: '#FFCA28', // Mustard yellow
    background: '#FAFAFA', // Soft white
    surface: '#F5F5F5', // Light grey
    text: '#212121', // Charcoal
    success: '#2E7D32', // Emerald green
    error: '#C62828', // Strong red
  },
  {
    id: 'food-dark',
    name: 'Food Tomato Dark',
    primary: '#B71C1C',
    secondary: '#388E3C',
    accent: '#FFB300',
    background: '#181A1B',
    surface: '#23272A',
    text: '#FAFAFA',
    success: '#1B5E20',
    error: '#8B0000',
  },
];

interface ThemeContextType {
  currentTheme: CustomTheme;
  themes: CustomTheme[];
  setTheme: (themeId: string) => void;
  createCustomTheme: (theme: Omit<CustomTheme, 'id'>) => void;
  deleteCustomTheme: (themeId: string) => void;
  getMaterialTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultThemes[0],
  themes: defaultThemes,
  setTheme: () => {},
  createCustomTheme: () => {},
  deleteCustomTheme: () => {},
  getMaterialTheme: () => createTheme(),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themes, setThemes] = useState<CustomTheme[]>(() => {
    const saved = localStorage.getItem('customThemes');
    const customThemes = saved ? JSON.parse(saved) : [];
    return [...defaultThemes, ...customThemes];
  });

  const [currentTheme, setCurrentTheme] = useState<CustomTheme>(() => {
    const savedThemeId = localStorage.getItem('currentThemeId');
    const theme = themes.find(t => t.id === savedThemeId) || themes[0];
    return theme;
  });

  useEffect(() => {
    localStorage.setItem('customThemes', JSON.stringify(themes.filter(t => !defaultThemes.find(dt => dt.id === t.id))));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem('currentThemeId', currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const createCustomTheme = (theme: Omit<CustomTheme, 'id'>) => {
    const newTheme: CustomTheme = {
      ...theme,
      id: `custom-${Date.now()}`,
    };
    setThemes(prev => [...prev, newTheme]);
    setCurrentTheme(newTheme);
  };

  const deleteCustomTheme = (themeId: string) => {
    if (defaultThemes.find(t => t.id === themeId)) {
      return; // Don't delete default themes
    }
    setThemes(prev => prev.filter(t => t.id !== themeId));
    if (currentTheme.id === themeId) {
      setCurrentTheme(themes[0]);
    }
  };

  const getMaterialTheme = (): Theme => {
    return createTheme({
      palette: {
        mode: currentTheme.id.includes('dark') ? 'dark' : 'light',
        primary: { main: currentTheme.primary },
        secondary: { main: currentTheme.secondary },
        background: {
          default: currentTheme.background,
          paper: currentTheme.surface,
        },
        text: {
          primary: currentTheme.text,
          secondary: currentTheme.text,
        },
        success: { main: currentTheme.success },
        error: { main: currentTheme.error },
        warning: { main: currentTheme.accent },
        info: { main: currentTheme.accent },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: currentTheme.surface,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: currentTheme.surface,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 600,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 16,
            },
          },
        },
      },
    });
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themes,
      setTheme,
      createCustomTheme,
      deleteCustomTheme,
      getMaterialTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 