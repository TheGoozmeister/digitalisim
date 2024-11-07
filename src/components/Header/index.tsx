import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutReducer } from '../../store/auth/authSlice';
import NavItem from '../NavItem';


function Header(): JSX.Element {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isDesktop = useMediaQuery('(min-width:1000px)');

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        dispatch(logoutReducer());
    };

    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h4" color="inherit">
                            Mov'Heat
                        </Typography>
                        <Typography variant="h5" color="inherit">
                            Mov'Hit
                        </Typography>
                        </Link>
                    </Box>

                    {isDesktop ? (
                        <List sx={{ display: 'flex' }}>
                        {isLoggedIn && <NavItem to="/" primary="Accueil" />}
                        {isLoggedIn ? (
                            <NavItem to="/" primary="Se déconnecter" onClick={handleLogout} />
                        ) : (
                            <NavItem to="/login" primary="Se connecter" />
                        )}
                        </List>
                    ) : (
                        <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                        </IconButton>
                    )}

                    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <List sx={{ width: '250px' }}>
                        {isLoggedIn && <NavItem to="/" primary="Accueil" onClick={toggleDrawer(false)} />}
                        {isLoggedIn ? (
                            <NavItem to="/" primary="Se déconnecter" onClick={() => { handleLogout(); toggleDrawer(false)(); }} />
                        ) : (
                            <NavItem to="/login" primary="Se connecter" onClick={toggleDrawer(false)} />
                        )}
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </header>
    );
}


export default Header;
