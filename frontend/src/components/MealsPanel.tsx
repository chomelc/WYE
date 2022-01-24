import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, ListItemText, ListItemIcon, Typography, CardActionArea } from "@mui/material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { useSelector } from "react-redux";

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
    let counter: number = 0;
    const current = new Date();
    var month = ("0" + (current.getMonth() + 1)).slice(-2);
    var day = ("0" + current.getDate()).slice(-2);
    const date = `${day}-${month}-${current.getFullYear()}`;

    const isCurrentDate = (d) => {
        if (d == date)
            return true;
        return false;
    };

    const isInTheFuture = (d) => {
        if (d >= date)
            return true;
        return false;
    }

    const days: IDay[] = useSelector(
        (state: DayState) => state.days)

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
            {days.length > 0 && days?.map(d => {
                // only display days from current day up until 7 days later
                // example : from monday to sunday
                if ((isInTheFuture(d.date)) && counter < 7) {
                    counter++;
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
                                                    primary={d.breakfast.name}
                                                    secondary="Petit-déjeuner"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <FastfoodIcon color={isCurrentDate(d.date) ? "success" : undefined} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={d.lunch.name}
                                                    secondary="Déjeuner"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <DinnerDiningIcon color={isCurrentDate(d.date) ? "success" : undefined} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={d.dinner.name}
                                                    secondary="Dîner"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </ThemeProvider>
                    );
                }
            })}
        </Box>
    )
}