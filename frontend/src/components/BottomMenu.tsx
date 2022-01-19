import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BottomMenu() {
  const [value, setValue] = React.useState('meals');

  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction component={Link} to="/history" value="history" label="Historique" icon={<HistoryIcon />} />
          <BottomNavigationAction component={Link} to="/meals" value="meals" label="Repas" icon={<RestaurantIcon />} />
          <BottomNavigationAction component={Link} to="/profile" value="profile" label="Profil" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}