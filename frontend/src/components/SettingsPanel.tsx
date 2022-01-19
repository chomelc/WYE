import React from "react";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, Paper, Grid, Button, Switch, Toolbar, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';


export default function SettingsPanel() {
    // accordion expansion
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    // time picker
    const [value, setValue] = React.useState<Date | null>(new Date());

    // notification day selection
    const days = [
        { label: 'Lundi', value: 1 },
        { label: 'Mardi', value: 2 },
        { label: 'Mercredi', value: 3 },
        { label: 'Jeudi', value: 4 },
        { label: 'Vendredi', value: 5 },
        { label: 'Samedi', value: 6 },
        { label: 'Dimanche', value: 7 }
    ];

    const [day, setDay] = React.useState('');

    const handleDayChange = (event: SelectChangeEvent) => {
        setDay(event.target.value);
    };

    // notification activation
    const [checked, setChecked] = React.useState(true);

    const handleNotificationChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '100%' },
                p: 2
            }}
            noValidate
            autoComplete="off"
        >
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Notifications
          </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Paramètres des notifications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ flexGrow: 1 }}>
                        <Toolbar>
                            <NotificationsNoneIcon sx={{ marginRight: 2 }} />
                            <Typography component="div" sx={{ flexGrow: 1 }}>
                                Notifications
                        </Typography>
                            <Switch checked={checked} onChange={handleNotificationChange} edge="start" />
                        </Toolbar>
                        <Collapse in={checked}>
                            <Grid container spacing={2} direction="column">
                                <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel id="notification-day">Jour de notification</InputLabel>
                                        <Select
                                            labelId="notification-day"
                                            id="notification-day-select"
                                            value={day}
                                            label="Jour de notification"
                                            onChange={handleDayChange}
                                            color="primary"
                                        >
                                            {days?.map(option => {
                                                return (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label ?? option.value}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            ampm={false}
                                            cancelText="Annuler"
                                            label="Heure de notification"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} color="primary" style={{ margin: 0 }} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Compte</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Paramètres du compte
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="row" alignItems="center">
                        <LogoutIcon /><Button variant="text">Déconnexion</Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>
                <Grid container direction="row" alignItems="center" justifyContent="center" style={{ minHeight: '5vh' }}>
                    Made with <FavoriteBorderIcon fontSize="small" style={{ margin: 6 }} /> by Chocho.
                </Grid>
            </Paper>
        </Box>
    );
}