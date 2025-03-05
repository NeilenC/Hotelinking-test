import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';

export interface Filters {
  search: string;
  minPrice: string;
  maxPrice: string;
  minDiscount: string;
  location: string;
  sortBy: string;
  order: string;
}

interface AccommodationFiltersProps {
  filters: Filters;
  onFilterChange: (field: keyof Filters) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AccommodationFilters({ filters, onFilterChange }: AccommodationFiltersProps) {
  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
       
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Precio mínimo"
            type="number"
            value={filters.minPrice}
            onChange={onFilterChange('minPrice')}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Precio máximo"
            type="number"
            value={filters.maxPrice}
            onChange={onFilterChange('maxPrice')}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Descuento mínimo"
            type="number"
            value={filters.minDiscount}
            onChange={onFilterChange('minDiscount')}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={filters.sortBy}
              label="Ordenar por"
              onChange={onFilterChange('sortBy') as any}
            >
              <MenuItem value="createdAt">Más recientes</MenuItem>
              <MenuItem value="price">Precio</MenuItem>
              <MenuItem value="discount">Descuento</MenuItem>
              <MenuItem value="name">Nombre</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
} 