// src/services/tmdbApi.ts

import axios from "axios";

const API_TOKEN = process.env.REACT_APP_TMDB_JWT;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`
    },
    params: {
        language: 'fr-FR',
    },
});

async function getPopularMovies(page: number) {
    try {
        const response = await tmdbApi.get('/movie/popular', { params: { page } });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des films populaires :", error);
        throw error;
    }
}

async function getMovieDetails(movieId: string) {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails du film ${movieId} :`, error);
        throw error;
    }
}

export {
    getPopularMovies,
    getMovieDetails 
};
