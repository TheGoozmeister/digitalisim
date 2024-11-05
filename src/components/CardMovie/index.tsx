// src/components/CardMovie.tsx

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CardMovieProps {
    title: string;
    id: number;
    cover: string;
    description: string;
}

function CardMovie({ title, id, cover, description }: CardMovieProps): JSX.Element {
    const navigate = useNavigate(); // Hook pour la navigation
    const imageUrl = `https://image.tmdb.org/t/p/w500${cover}`;

    // Fonction pour gérer le clic sur la carte
    const handleCardClick = () => {
        navigate(`/movie/${id}`); // Redirection vers la page du film
    };

    return (
        <Card style={{ cursor: 'pointer' }} onClick={handleCardClick}> {/* Appel à handleCardClick sur clic */}
            <CardMedia
                component="img"
                height="300"
                image={imageUrl}
                alt={title}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardMovie;
