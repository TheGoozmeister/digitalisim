// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutReducer } from '../../store/auth/authSlice';

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    
    const isDesktop = useMediaQuery('(min-width:600px)');

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        dispatch(logoutReducer());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, cursor: 'pointer' }}>
                    <Link 
                        to="/" 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Typography variant="h4" color="inherit">
                            Mov'Heat
                        </Typography>
                        <Typography variant="h5" color="inherit">
                            Mov'Hit
                        </Typography>
                    </Link>
                </Box>

                {/* Affichage conditionnel du menu en fonction de la taille de l'écran */}
                {isDesktop ? (
                    <List sx={{ display: 'flex' }}>
                        {isLoggedIn && 
                            <ListItem
                                component={Link}
                                to="/"
                                sx={{
                                    padding: '0 16px',
                                    width: '200px', // Largeur plus grande pour garder le texte sur une seule ligne
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                }}
                            >
                                <ListItemText primary="Accueil" />
                            </ListItem>
                        }
                        {isLoggedIn ? (
                            <ListItem 
                                onClick={handleLogout} 
                                sx={{
                                    padding: '0 16px', 
                                    width: '200px', // Largeur plus grande pour "Se déconnecter" sur une ligne
                                    cursor: 'pointer', 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                }}
                            >
                                <ListItemText primary="Se déconnecter" />
                            </ListItem>
                        ) : (
                            <ListItem
                                component={Link}
                                to="/login"
                                sx={{
                                    padding: '0 16px',
                                    width: '200px', // Largeur plus grande pour "Se connecter" sur une ligne
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                }}
                            >
                                <ListItemText primary="Se connecter" />
                            </ListItem>
                        )}
                    </List>
                ) : (
                    // Menu burger visible uniquement sur mobile
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Menu Drawer qui s'ouvre depuis la droite */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <List sx={{ width: '250px' }}>
                        {isLoggedIn && 
                            <ListItem
                                component={Link}
                                to="/"
                                onClick={toggleDrawer(false)}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <ListItemText primary="Accueil" />
                            </ListItem>
                        }
                        {isLoggedIn ? (
                            <>
                                <ListItem onClick={() => { handleLogout(); toggleDrawer(false)(); }} sx={{cursor: 'pointer'}}>
                                    <ListItemText primary="Se déconnecter" />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem
                                    component={Link}
                                    to="/login"
                                    onClick={toggleDrawer(false)}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
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
