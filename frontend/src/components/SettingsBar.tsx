import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const headingFont = createTheme({
    typography: {
        allVariants: {
            color: "#312F2F"
        }
    },
});

export default function SettingsBar() {
    let navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color={"default"}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="settings"
                        onClick={() => navigate(-1)}
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <ThemeProvider theme={headingFont}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Paramètres
                        </Typography>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

