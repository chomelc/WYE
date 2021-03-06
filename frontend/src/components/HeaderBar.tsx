import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const headingFont = createTheme({
  typography: {
    fontFamily: [
      'Pacifico',
      'cursive',
    ].join(','),
    allVariants: {
      color: "#312F2F"
    }
  },
});

export default function HeaderBar(props) {
  let navigate = useNavigate();
  const settingsBool = props.settings
  let settings;
  const backButtonBool = props.backButton;
  let backButton;

  if (backButtonBool) {
    backButton = <IconButton
      size="large"
      edge="start"
      color="primary"
      aria-label="settings"
      onClick={() => navigate(-1)}
    >
      <KeyboardBackspaceIcon />
    </IconButton>
  }

  if (settingsBool) {
    settings = <IconButton
      size="large"
      edge="start"
      color="primary"
      aria-label="settings"
      component={Link}
      to="/settings"
    >
      <SettingsIcon />
    </IconButton>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"default"}>
        <Toolbar>
          {backButton}
          <ThemeProvider theme={headingFont}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              What ya eatin'?
            </Typography>
          </ThemeProvider>
          {settings}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

