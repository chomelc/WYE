import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, ListItemText, ListItemIcon, Typography, CardActionArea } from "@mui/material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';

const green = "#1D5722";
const lightGreen = alpha("#1D5722", 0.2);
const defaultTheme = createTheme();

const currentDay = createTheme({
    typography: {
        allVariants: {
            color: green
        }
    }
});

export default function MealsPanel() {
    const current = new Date();
    var month = ("0" + (current.getMonth() + 1)).slice(-2);
    var day = ("0" + current.getDate()).slice(-2);
    const date = `${day}-${month}-${current.getFullYear()}`;

    const isCurrentDate = (d) => {
        if (d == date)
            return true;
        return false;
    };

    const days = [
        { day: 'Lundi', date: "17-01-2022" },
        { day: 'Mardi', date: "18-01-2022" },
        { day: 'Mercredi', date: "19-01-2022" },
        { day: 'Jeudi', date: "20-01-2022" },
        { day: 'Vendredi', date: "21-01-2022" },
        { day: 'Samedi', date: "22-01-2022" },
        { day: 'Dimanche', date: "23-01-2022" }
    ];

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
            {days?.map(d => {
                return (
                    <ThemeProvider theme={isCurrentDate(d.date) ? currentDay : defaultTheme}>
                        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                            <CardActionArea component={Link} to={"/meals/" + d.date}>
                                <CardContent style={isCurrentDate(d.date) ? { backgroundColor: lightGreen } : undefined}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={8}>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                {d.day}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container direction="row-reverse">
                                                <Grid item>
                                                    <Chip label={d.date} variant="outlined" color={isCurrentDate(d.date) ? "success" : undefined} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CoffeeIcon color={isCurrentDate(d.date) ? "success" : undefined} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Petit-déjeuner"
                                                secondary="plat"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <FastfoodIcon color={isCurrentDate(d.date) ? "success" : undefined} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Déjeuner"
                                                secondary="plat"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DinnerDiningIcon color={isCurrentDate(d.date) ? "success" : undefined} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Dîner"
                                                secondary="plat"
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </ThemeProvider>
                );
            })}
        </Box>
    )
}