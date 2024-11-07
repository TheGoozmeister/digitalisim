import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from '@mui/material/Typography';


function Footer(): JSX.Element {

    return (
        <footer>
            <BottomNavigation
                sx={{
                    backgroundColor: '#333',  
                    padding: '20px 0',
                    marginTop: "80px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" color="white" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                    Move Heat Move Hit
                </Typography>
                <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                    Développé par Vincent Pastor
                </Typography>
                <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                    Réalisé avec React et l'API de TMDB
                </Typography>
            </BottomNavigation>
        </footer>
    );
}


export default Footer;
