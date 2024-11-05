import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/tmdbApi';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Container, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CardMovie from '../../components/CardMovie';
import Login from '../../components/Login';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

function Landing() {
    const [movies, setMovies] = useState<Movie[]>([]); // Tableau de films populaires
    const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
                console.log(data)
            } catch (err) {
                setError("Erreur lors du chargement des films.");
                console.error("Erreur lors de la récupération des films populaires :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <CircularProgress />; // Affichage pendant le chargement

    if (error) return <Alert severity="error">{error}</Alert>; // Affichage de l'erreur, si elle existe

    return (
        <Container>
            <Login />
            <Typography variant="h1" gutterBottom>
                Films Populaires
            </Typography>
            <Grid container spacing={2}>
                {movies.map((movie, index) => (
                    <Grid size={index % 2 === 0 ? 8 : 4} key={movie.id}>
                        <CardMovie 
                            title={movie.title}
                            id={movie.id}
                            cover={movie.poster_path}
                            description={movie.overview}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Landing;
