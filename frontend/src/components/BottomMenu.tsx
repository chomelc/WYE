import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BottomMenu() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/meals" label="Repas" icon={<RestaurantIcon />} />
          <BottomNavigationAction component={Link} to="/profile" label="Profil" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}