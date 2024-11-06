// src/components/CardMovie.tsx

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CardMovieProps {
    title: string;
    id: number;
    cover: string;
    description: string;
    rating: number;
    releaseDate: string;
}

function CardMovie({ title, id, cover, description, rating, releaseDate }: CardMovieProps): JSX.Element {
    const navigate = useNavigate();
    const imageUrl = `https://image.tmdb.org/t/p/w500${cover}`;

    const handleCardClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <Card 
            onClick={handleCardClick} 
            sx={{
                cursor: 'pointer',
                maxWidth: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image={imageUrl}
                alt={title}
                sx={{
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {description}
                </Typography>
                <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Note : {rating.toFixed(1)} / 10
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sortie : {releaseDate}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CardMovie;
