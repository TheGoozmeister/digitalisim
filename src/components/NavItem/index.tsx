import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';


function NavItem({ to, primary, onClick }: { to: string, primary: string, onClick?: () => void }): JSX.Element {
    return (
        <ListItem
            component={Link}
            to={to}
            onClick={onClick}
            sx={{
                padding: '0 16px',
                width: '200px',
                display: 'flex',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'inherit',
            }}
            >
            <ListItemText primary={primary} />
        </ListItem>
    );
}


export default NavItem;
