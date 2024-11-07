import * as React from 'react';
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
            role='button'
            onClick={handleCardClick} 
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',  
                boxShadow: 3,
                '&:hover': {
                    boxShadow: 6,
                },
                borderRadius: 2,
                overflow: 'hidden',
                height: {xs:200, sm:300},  
            }}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
                sx={{
                    objectFit: 'cover',
                    borderRadius: '4px 0 0 4px', 
                    width: {xs:100, sm:200, md:200}, 
                    height: '100%',  
                }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{
                    height: {xs: "60px", md:"100px"},  
                    overflow: "hidden",  
                }}>
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,  
                            textOverflow: 'ellipsis',  
                        }}>
                        {description}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <Star sx={{ fontSize: 16, marginRight: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                            {rating.toFixed(1)} / 10
                        </Typography>
                    </Box>
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
