import { createTheme } from '@mui/material/styles';

/** Shared enterprise theme consumed by the shell and every microfrontend. */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1d4ed8' },
    secondary: { main: '#0f766e' },
    background: { default: '#f3f4f6', paper: '#ffffff' },
    text: { primary: '#111827', secondary: '#4b5563' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiAppBar: { defaultProps: { elevation: 0 } },
  },
});

export const SIDEBAR_WIDTH = 248;
export const HEADER_HEIGHT = 64;
