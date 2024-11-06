import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Star, CalendarToday } from '@mui/icons-material';

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
                display: 'flex',
                flexDirection: 'row',  // Card in row direction
                boxShadow: 3,
                '&:hover': {
                    boxShadow: 6,
                },
                borderRadius: 2,
                overflow: 'hidden',
                height: 300,  // Hauteur fixe de la carte, ajustez selon vos besoins
            }}
        >
            {/* Image */}
            <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
                sx={{
                    objectFit: 'cover',
                    borderRadius: '4px 0 0 4px', 
                    width: 250, // Largeur de l'image
                    height: '100%',  // Utilise 100% de la hauteur de la carte
                }}
            />

            {/* Information Content */}
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {title}
                </Typography>

                {/* Description */}
                <Box sx={{
                    height: "100px",  // Hauteur fixe de la description
                    overflow: "hidden",  // Cache tout ce qui dépasse
                }}>
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,  // Limite à 3 lignes
                            textOverflow: 'ellipsis',  // Affiche "..." pour le texte trop long
                        }}>
                        {description}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {/* Note with Star Icon */}
                    <Box display="flex" alignItems="center">
                        <Star sx={{ fontSize: 16, marginRight: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                            {rating.toFixed(1)} / 10
                        </Typography>
                    </Box>

                    {/* Date with Calendar Icon */}
                    <Box display="flex" alignItems="center">
                        <CalendarToday sx={{ fontSize: 16, marginRight: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                            {releaseDate}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CardMovie;
