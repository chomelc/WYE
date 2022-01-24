import { ThemeProvider } from "@emotion/react";
import { Card, CardActionArea, CardContent, Grid, Typography, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, alpha, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { getDay } from "../state/actions/day.actions";
import { getCurrentDate } from "../modules/utils";

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

export default function MealsCard(props) {
    const d: IDay = props.d;

    const date = getCurrentDate();

    const isCurrentDate = (d) => {
        if (d == date)
            return true;
        return false;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (slug: string) => evt => {
        evt.preventDefault();
        dispatch(getDay(slug));
        navigate("/meals/" + slug);
    }
    return (
        <ThemeProvider theme={isCurrentDate(d.date) ? currentDay : defaultTheme}>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                <CardActionArea onClick={handleClick(d.date)}>
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