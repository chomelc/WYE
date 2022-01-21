import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function getPageValue(route) {
  switch (route) {
    case '/history': return "history";
    case '/meals': return "meals";
    case '/profile': return "profile";
    case '/groceries': return "groceries";
    default: return "meals";
  }
}

export default function BottomMenu() {
  const pathname = window.location.pathname

  const value = getPageValue(pathname);

  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>
        <BottomNavigation value={value}>
          <BottomNavigationAction component={Link} to="/meals" value="meals" label="Repas" icon={<RestaurantIcon />} />
          <BottomNavigationAction component={Link} to="/history" value="history" label="Historique" icon={<HistoryIcon />} />
          <BottomNavigationAction component={Link} to="/groceries" value="groceries" label="Courses" icon={<ShoppingBasketIcon />} />
          <BottomNavigationAction component={Link} to="/profile" value="profile" label="Profil" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}