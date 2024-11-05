// src/components/Login.tsx

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import { AppDispatch } from '../../store/store';
import { login } from '../../services/authApi';
import { loginReducer } from '../../store/auth/authSlice';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // Initialisation du hook useNavigate
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Empêcher le rechargement de la page
        setLoading(true);
        setError(null); // Réinitialiser l'erreur avant de tenter la connexion

        try {
            const userCredentials = { username, password };
            const response = await login(userCredentials);

            // Enregistrer les informations utilisateur dans Redux après la connexion réussie
            dispatch(loginReducer({userName: userCredentials.username }));

            console.log('Connexion réussie:', response);
            navigate("/"); // Redirection vers la page d'accueil
        } catch (err) {
            setError('Erreur lors de la connexion. Veuillez vérifier vos informations.');
            console.error('Erreur de connexion:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
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
                >
                    {loading ? 'Chargement...' : 'Se connecter'}
                </Button>
            </form>
        </Container>
    );
}

export default Login;
