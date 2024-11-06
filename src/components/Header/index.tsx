// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutReducer } from '../../store/auth/authSlice';

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        dispatch(logoutReducer());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Titre de l'application sur deux lignes */}
                <Box sx={{ flexGrow: 1, cursor: 'pointer' }}>
                <Link 
                    to="/" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                >
                    <Typography variant="h4" color="inherit">
                        Mov'Heat
                    </Typography>
                    <Typography variant="h5" color="inherit">
                        Mov'Hit
                    </Typography>
                </Link>
                </Box>

                {/* Bouton Menu Burger visible en mode mobile et desktop */}
                <IconButton
                    color="inherit"
                    edge="end"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* Menu Drawer qui s'ouvre depuis la droite */}
                <Drawer
                    anchor="right" // Le Drawer vient maintenant de la droite
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <List sx={{ width: '250px' }}> {/* Taille du Drawer ajustée */}
                        {isLoggedIn && 
                            <ListItem
                                component={Link}
                                to="/"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Accueil" />
                            </ListItem>
                        }
                        {isLoggedIn ? (
                            <>
                                <ListItem onClick={() => { handleLogout(); toggleDrawer(false)(); }}>
                                    <ListItemText primary="Se déconnecter" />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem
                                    component={Link}
                                    to="/login"
                                    onClick={toggleDrawer(false)}
                                >
                                    <ListItemText primary="Se connecter" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
