import * as React from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, Typography, Slider, Checkbox, FormControlLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Filters {
  adult: boolean;
  minRating: number;
  maxRating: number;
  language: string;
  releaseYearRange: number[];
}

interface DrawerFilterProps {
  onFilterChange: (filters: Filters) => void;
}

function DrawerFilter({ onFilterChange }: DrawerFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<Filters>({
    adult: false,
    minRating: 0,
    maxRating: 10,
    language: 'all',
    releaseYearRange: [1980, 2024]
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, adult: event.target.checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingRangeChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    const newFilters = { ...filters, minRating: min, maxRating: max };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newFilters = { ...filters, language: event.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleYearRangeChange = (event: Event, newValue: number | number[]) => {
    const newFilters = { ...filters, releaseYearRange: newValue as number[] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const DrawerList = (
    <Box sx={{ width: 300, padding: 2 }} role="presentation">
      <Typography variant="h6" sx={{ m: 2 }}>Filtres</Typography>
      <Divider />

      {/* Filtre pour les films pour adultes */}
      

      {/* Filtre pour la plage de notes */}
      <List>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Plage de notes</Typography>
          <Slider
            value={[filters.minRating, filters.maxRating]}
            onChange={handleRatingRangeChange}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={0}
            max={10}
            sx={{ mt: 2, mb: 1, width: '100%' }}
          />
          <Typography variant="body2" color="textSecondary">
            {`De ${filters.minRating} à ${filters.maxRating}`}
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Filtre pour la langue */}
      <List>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Langue</Typography>
          <Select
            fullWidth
            value={filters.language}
            onChange={handleLanguageChange}
            sx={{ mt: 1, mb: 1 }}
          >
            <MenuItem value="all">Toutes les langues</MenuItem>
            <MenuItem value="en">Anglais</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Filtre pour l'année de sortie */}
      <List>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Année de sortie</Typography>
          <Slider
            value={filters.releaseYearRange}
            onChange={handleYearRangeChange}
            valueLabelDisplay="auto"
            min={1950}
            max={2024}
            marks={[{ value: 1950, label: '1950' }, { value: 2023, label: '2024' }]}
            sx={{ mt: 2, mb: 1, width: '100%' }}
          />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Options</Typography>
          <FormControlLabel
            control={<Checkbox checked={filters.adult} onChange={handleAdultChange} />}
            label="Afficher les films pour adultes"
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          backgroundColor: '#333',
          color: 'white',
          padding: '8px 16px',
          margin: '10px 0px 30px 0px',
          '&:hover': {
            backgroundColor: '#555'
          }
        }}
      >
        Sélectionnez vos filtres
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default DrawerFilter;
