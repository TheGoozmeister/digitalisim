// src/pages/Movie/index.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbApi';
import { CircularProgress, Alert, Typography } from '@mui/material';

interface MovieDetails {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

function Movie(): JSX.Element {
    const { movieId } = useParams<{ movieId: string | undefined }>(); // Récupération de l'ID du film à partir de l'URL
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) {
                setError("ID du film non fourni.");
                setLoading(false);
                return;
            }

            try {
                const data = await getMovieDetails(movieId);
                setMovieDetails(data);
            } catch (err) {
                setError("Erreur lors du chargement des détails du film.");
                console.error("Erreur lors de la récupération des détails du film :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]); // Le tableau de dépendances inclut movieId pour re-fetch si l'ID change

    if (loading) return <CircularProgress />; // Affichage pendant le chargement
    if (error) return <Alert severity="error">{error}</Alert>; // Affichage de l'erreur, si elle existe

    if (!movieDetails) return <Typography variant="body1">Aucun détail disponible pour ce film.</Typography>; // Au lieu de retourner null, retourne un message

    return (
        <div className="movie">
            <Typography variant="h4">{movieDetails.title}</Typography>
            <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                style={{ width: '300px', height: 'auto' }}
            />
            <Typography variant="body1">{movieDetails.overview}</Typography>
            <Typography variant="caption">Date de sortie: {movieDetails.release_date}</Typography>
        </div>
    );
}

export default Movie;
