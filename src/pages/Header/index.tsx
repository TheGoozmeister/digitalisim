import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Mon Application de Films
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Accueil
                </Button>
            </Toolbar>
        </AppBar>
    );
};


export default Header;
