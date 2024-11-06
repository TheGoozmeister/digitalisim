// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "'Poppins', sans-serif", 
        h4: {
            fontWeight: 'bold',
            fontSize: '2rem',
            lineHeight: 1,
        },
        h5: {
            fontSize: '1rem',
            lineHeight: 1,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                backgroundColor: '#333', 
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    display: 'block', 
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                top: 0, 
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                padding: '8px 16px', 
                },
            },
        },
    },
});

export default theme;
