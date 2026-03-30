import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    neutral: Palette['primary'];
    base: Palette['primary'] & {
      100: string;
      200: string;
      300: string;
    };
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    base?: PaletteOptions['primary'] & {
      100?: string;
      200?: string;
      300?: string;
    };
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    accent: true;
    neutral: true;
    base: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
    neutral: true;
    base: true;
  }
}

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#EE2A26', 
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#7A00C2', 
      contrastText: '#E3D4F6'
    },
    accent: {
      main: '#42AA00', 
      contrastText: '#000000'
    },
    neutral: {
      main: '#2F1B05', 
      contrastText: '#D2CCC7'
    },
    base: {
      main: '#1B1816', 
      100: '#1B1816',
      200: '#0B0908',
      300: '#000000',
      contrastText: '#FFFFFF'
    }

  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
});

export default customTheme;