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
        // Personnalisation de l'AppBar (Header)
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333',
                    padding: '16px 24px',  // Augmenter le padding en haut et en bas
                    zIndex: 100,  // Assurez-vous que l'AppBar est toujours au-dessus des autres éléments
                },
            },
        },
        // Personnalisation de la Card (Carte du film)
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
    },
});

export default theme;
