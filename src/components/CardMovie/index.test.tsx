// src/components/CardMovie/CardMovie.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardMovie from './index';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('CardMovie component', () => {
    const mockNavigate = useNavigate as jest.Mock;

    const defaultProps = {
        title: 'Inception',
        id: 1,
        cover: '/test-cover.jpg',
        description: 'A mind-bending thriller that dives deep into the concept of dreams.',
        rating: 8.8,
        releaseDate: '2010-07-16',
    };

    beforeEach(() => {
        mockNavigate.mockClear();
    });

    const renderComponent = () =>
        render(
        <BrowserRouter>
            <CardMovie {...defaultProps} />
        </BrowserRouter>
        );

    it('renders movie title, description, rating, and release date', () => {
        renderComponent();

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText(/A mind-bending thriller/i)).toBeInTheDocument();
        expect(screen.getByText('8.8 / 10')).toBeInTheDocument();
        expect(screen.getByText('2010-07-16')).toBeInTheDocument();
    });

    it('renders the cover image with correct src and alt attributes', () => {
        renderComponent();

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', `https://image.tmdb.org/t/p/w500${defaultProps.cover}`);
        expect(img).toHaveAttribute('alt', 'Inception');
    });
});
