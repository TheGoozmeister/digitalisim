import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/tmdbApi';
import { Typography, CircularProgress, Container, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CardMovie from '../../components/CardMovie';
import DrawerFilter from '../../components/DrawerFilter';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box'; 

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
    maxRating: number;
    language: string;
    releaseYearRange: number[]; 
}

function Landing() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({
        adult: false,
        minRating: 0,
        maxRating: 10,
        language: 'all',
        releaseYearRange: [1980, 2024]
    });
    const [sortCriterion, setSortCriterion] = useState<string>('release_date_desc');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const firstPageData = await getPopularMovies(1);
                const popularMovies = firstPageData.results;
                setMovies(popularMovies);

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
            const releaseYear = new Date(movie.release_date).getFullYear();
            return (
                (filters.adult || !movie.adult) &&
                movie.vote_average >= filters.minRating &&
                movie.vote_average <= filters.maxRating &&
                (filters.language === 'all' || movie.original_language === filters.language) &&
                releaseYear >= filters.releaseYearRange[0] && 
                releaseYear <= filters.releaseYearRange[1]  
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

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', 
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
            <Typography 
                variant="h1" 
                sx={{fontSize:{xs:'2.4rem'}}}
                gutterBottom
            >
                Heat or Hit ?
            </Typography>
            <Typography 
                variant="h2" 
                sx={{fontSize:{xs:'1.5rem'}}}
                gutterBottom>
                Chef d'oeuvre ou nanar ? A vous de voir ! 
            </Typography>
            <DrawerFilter onFilterChange={handleFilterChange} />            
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
                {sortedMovies.map((movie) => (
                    <Grid size={{ xs: 12, md: 6 }} key={movie.id}>
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
