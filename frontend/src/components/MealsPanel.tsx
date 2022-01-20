import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, ListItemText, ListItemIcon, Typography, CardActionArea } from "@mui/material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { Link } from "react-router-dom";

export default function MealsPanel() {
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
                    <Card sx={{ minWidth: 275, marginBottom: 2 }} >
                        <CardActionArea component={Link} to={"/meals/" + d.date}>
                            <CardContent>
                                <Grid container spacing={2} >
                                    <Grid item xs={8}>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {d.day}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid container direction="row-reverse">
                                            <Grid item>
                                                <Chip label={d.date} variant="outlined" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CoffeeIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Petit-déjeuner"
                                            secondary="plat"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FastfoodIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Déjeuner"
                                            secondary="plat"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <DinnerDiningIcon />
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
                );
            })}
        </Box>
    )
}