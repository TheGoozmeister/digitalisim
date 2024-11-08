import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h1: {
            fontWeight: '700',
            fontSize: '4rem',
            lineHeight : 1,
            margin: "30px 0px 0px 0px"
        },
        h2: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: '400',
            fontSize: '2.5rem',
            lineHeight : 1,
        },
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
                    padding: '16px 24px',  
                    zIndex: 100,  
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 8,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: 300,
                },
            },
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    objectFit: 'cover',
                    borderRadius: '4px 0 0 4px', 
                    height: '100%'
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 16,
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#333',  
                    height: 4,      
                },
                track: {
                    backgroundColor: '#333',  
                },
                rail: {
                    backgroundColor: '#ddd',  
                },
                mark: {
                    backgroundColor: '#555',  
                    height: 8,
                    width: 2,
                },
                markLabel: {
                    color: '#333', 
                },
            },
        },
    },
});


export default theme;
