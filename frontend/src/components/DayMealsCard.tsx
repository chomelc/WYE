import { Card, CardContent, Grid, Typography, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import React from "react";

export default function DayMealsCard(props) {
    const d: IDay = props.d;
    const [breakfast, setBreakfast] = React.useState('');

    const handleBFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBreakfast(event.target.value);
    };

    const [lunch, setLunch] = React.useState('');

    const handleLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLunch(event.target.value);
    };

    const [dinner, setDinner] = React.useState('');

    const handleDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDinner(event.target.value);
    };

    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
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
                        />
                    </ListItem>
                    <ListItem>
                        <TextField id="add-breakfast" value={breakfast} label="Petit-déjeuner" variant="filled" onChange={handleBFChange} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Déjeuner"
                        />
                    </ListItem>
                    <ListItem>
                        <TextField id="add-breakfast" value={lunch} label="Déjeuner" variant="filled" onChange={handleLChange} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <DinnerDiningIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Dîner"
                        />
                    </ListItem>
                    <ListItem>
                        <TextField id="add-dinner" value={dinner} label="Dîner" variant="filled" onChange={handleDChange} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}