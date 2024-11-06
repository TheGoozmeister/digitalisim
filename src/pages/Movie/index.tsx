import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbApi';
import { CircularProgress, Alert, Typography, Box, Chip, Divider } from '@mui/material';
import { Star, CalendarToday, LocationOn, Theaters } from '@mui/icons-material';

interface MovieDetails {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    production_countries: Array<{ name: string }>;
    production_companies: Array<{ name: string; logo_path: string }>;
    adult: boolean;
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
                console.log("filmData", data);
            } catch (err) {
                setError("Erreur lors du chargement des détails du film.");
                console.error("Erreur lors de la récupération des détails du film :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]); // Le tableau de dépendances inclut movieId pour re-fetch si l'ID change

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Prend toute la hauteur de l'écran
            }}
        >
            <CircularProgress />
        </Box>
    ); // Affichage pendant le chargement

    if (error) return <Alert severity="error">{error}</Alert>; // Affichage de l'erreur, si elle existe

    if (!movieDetails) return <Typography variant="body1">Aucun détail disponible pour ce film.</Typography>; // Au lieu de retourner null, retourne un message

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}> {/* Limiter la largeur de toute la page */}
            {/* Titre du film centré avec marge différente en fonction de l'écran et taille de texte ajustée */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    marginTop: { xs: 2, sm: 4 },  // Marge top différente pour les petits écrans
                    marginBottom: { xs: 2, sm: 4 },  // Marge bottom différente pour les petits écrans
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', sm: '2.5rem' } // Taille du texte ajustée pour xs et sm
                }}
            >
                {movieDetails.title}
            </Typography>

            {/* Image centrée */}
            <Box display="flex" justifyContent="center" mb={2}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    style={{ width: '300px', height: 'auto' }}
                />
            </Box>

            {/* Description centrée, taille augmentée et largeur limitée avec taille de texte ajustée pour xs */}
            <Box display="flex" justifyContent="center" mb={2}>
                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: '800px', // Limite la largeur de la description
                        textAlign: 'center', // Centre le texte
                        fontSize: { xs: '1rem', sm: '1.2rem' }  // Taille du texte ajustée pour xs et sm
                    }}
                >
                    {movieDetails.overview}
                </Typography>
            </Box>

            {/* Indication si c'est un film pour adulte */}
            {movieDetails.adult && (
                <Chip label="Film pour adultes" color="error" icon={<Theaters />} sx={{ marginBottom: 2 }} />
            )}

            <Divider sx={{ marginY: 2 }} />

            {/* Informations supplémentaires, sur la même ligne en grand écran, empilées en petit écran */}
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={2}>
                {/* Note */}
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        flexBasis: { xs: '100%', sm: '22%' }, // Prend 100% de la largeur en xs, 22% en sm et plus
                        marginBottom: { xs: 2, sm: 0 }, // Marge en bas en xs
                        justifyContent: 'center' // Centrer les éléments en xs
                    }}
                >
                    <Star sx={{ fontSize: 20, marginRight: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        {movieDetails.vote_average.toFixed(1)} / 10
                    </Typography>
                </Box>

                {/* Date de sortie */}
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        flexBasis: { xs: '100%', sm: '22%' },
                        marginBottom: { xs: 2, sm: 0 },
                        justifyContent: 'center'
                    }}
                >
                    <CalendarToday sx={{ fontSize: 20, marginRight: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        {new Date(movieDetails.release_date).toLocaleDateString()}
                    </Typography>
                </Box>

                {/* Pays de production */}
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        flexBasis: { xs: '100%', sm: '22%' },
                        marginBottom: { xs: 2, sm: 0 },
                        justifyContent: 'center'
                    }}
                >
                    <LocationOn sx={{ fontSize: 20, marginRight: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        {movieDetails.production_countries.map(country => country.name).join(', ')}
                    </Typography>
                </Box>

                {/* Boîtes de production */}
                <Box
                    display="flex"
                    flexWrap="wrap"
                    sx={{
                        flexBasis: { xs: '100%', sm: '22%' },
                        justifyContent: 'center'
                    }}
                >
                    {movieDetails.production_companies.map(company => (
                        <Box key={company.name} display="flex" alignItems="center" mr={2} mb={1}>
                            {company.logo_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w45${company.logo_path}`}
                                    alt={company.name}
                                    style={{ marginRight: 8 }}
                                />
                            ) : (
                                <Theaters sx={{ fontSize: 20, marginRight: 0.5 }} />
                            )}
                            <Typography variant="body2" color="text.secondary">{company.name}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Movie;
