// src/components/Login.tsx

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { AppDispatch } from '../../store/store';
import { login } from '../../services/authApi';
import { loginReducer } from '../../store/auth/authSlice';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        setLoading(true);
        setError(null); 

        try {
            const userCredentials = { username, password };
            const response = await login(userCredentials);
            dispatch(loginReducer({userName: userCredentials.username }));
            console.log('Connexion réussie:', response);
            navigate("/"); 
        } catch (err) {
            setError('Erreur lors de la connexion. Veuillez vérifier vos informations.');
            console.error('Erreur de connexion:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx= {{mt:4, mb:4}}
            >
                Connexion
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleLogin}>
                <TextField
                    label="Nom d'utilisateur"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    sx={{mt:4}}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{mt:4}}
                >
                    {loading ? 'Chargement...' : 'Se connecter'}
                </Button>
            </form>
        </Container>
    );
}


export default Login;
