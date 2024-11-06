import * as React from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemText, Slider, Checkbox, FormControlLabel, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';

interface TemporaryDrawerProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  adult: boolean;
  minRating: number;
  language: string;
}

export default function TemporaryDrawer({ onFilterChange }: TemporaryDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<Filters>({
    adult: false,
    minRating: 0,
    language: 'all'
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, adult: event.target.checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    const newFilters = { ...filters, minRating: newValue as number };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newFilters = { ...filters, language: event.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography variant="h6" sx={{ m: 2 }}>Filtres</Typography>
      <Divider />

      {/* Filtre pour les films pour adultes */}
      <List>
        <ListItem>
          <FormControlLabel
            control={<Checkbox checked={filters.adult} onChange={handleAdultChange} />}
            label="Afficher les films pour adultes"
          />
        </ListItem>
      </List>

      <Divider />

      {/* Filtre pour la note minimale */}
      <List>
        <ListItem>
          <Typography variant="subtitle1">Note minimale</Typography>
          <Slider
            value={filters.minRating}
            onChange={handleRatingChange}
            aria-labelledby="minimum-rating-slider"
            step={0.5}
            marks
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
        </ListItem>
      </List>

      <Divider />

      {/* Filtre pour la langue */}
      <List>
        <ListItem>
          <Typography variant="subtitle1">Langue</Typography>
          <Select
            fullWidth
            value={filters.language}
            onChange={handleLanguageChange}
          >
            <MenuItem value="all">Toutes les langues</MenuItem>
            <MenuItem value="en">Anglais</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="es">Espagnol</MenuItem>
            {/* Ajoutez d'autres langues en fonction de vos besoins */}
          </Select>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
