// src/components/Login.tsx

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { login } from '../../services/authApi';

const Login: React.FC = () => {
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
            console.log('Connexion réussie:', response);
            // Rediriger ou mettre à jour l'état selon vos besoins
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
};

export default Login;
