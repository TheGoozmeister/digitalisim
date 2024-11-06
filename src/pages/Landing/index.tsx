import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/tmdbApi';
import {Typography, CircularProgress, Container, Alert,Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CardMovie from '../../components/CardMovie';
import TemporaryDrawer from '../../components/TemporaryDrawer';
import { SelectChangeEvent } from '@mui/material'; // Import du bon type

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    adult: boolean;
    vote_average: number;
    original_language: string;
    release_date: string;
}
interface Filters {
    adult: boolean;
    minRating: number;
    language: string;
}

function Landing() {

    const [movies, setMovies] = useState<Movie[]>([]); // Tableau de films populaires
    const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs
    const [filters, setFilters] = useState<Filters>({
        adult: false,
        minRating: 0,
        language: 'all'
    });
    const [sortCriterion, setSortCriterion] = useState<string>('release_date_desc');

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

    const handleFilterChange = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortCriterion(event.target.value as string);
    };

    const sortedMovies = [...movies]
        .filter((movie) => {
            return (
                (filters.adult || !movie.adult) &&
                movie.vote_average >= filters.minRating &&
                (filters.language === 'all' || movie.original_language === filters.language)
            );
        })
        .sort((a, b) => {
            if (sortCriterion === 'release_date_desc') {
                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            } else if (sortCriterion === 'release_date_asc') {
                return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
            } else if (sortCriterion === 'rating_desc') {
                return b.vote_average - a.vote_average;
            } else if (sortCriterion === 'rating_asc') {
                return a.vote_average - b.vote_average;
            }
            return 0;
        });

    if (loading) return <CircularProgress />; // Affichage pendant le chargement

    if (error) return <Alert severity="error">{error}</Alert>; // Affichage de l'erreur, si elle existe

    return (
        <Container>
            <TemporaryDrawer onFilterChange={handleFilterChange} />            <Typography variant="h1" gutterBottom>
                Films Populaires
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tri par</InputLabel>
                <Select value={sortCriterion} onChange={handleSortChange}>
                    <MenuItem value="release_date_desc">Date de sortie (décroissant)</MenuItem>
                    <MenuItem value="release_date_asc">Date de sortie (croissant)</MenuItem>
                    <MenuItem value="rating_desc">Note (décroissant)</MenuItem>
                    <MenuItem value="rating_asc">Note (croissant)</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={2}>
                {sortedMovies.map((movie, index) => (
                    <Grid size={{xs:12, md:6}} key={movie.id}>
                        <CardMovie
                            title={movie.title}
                            id={movie.id}
                            cover={movie.poster_path}
                            description={movie.overview}
                            rating={movie.vote_average}
                            releaseDate={movie.release_date}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Landing;
