import { Card, CardContent, Grid, Typography, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, TextField, Button } from "@mui/material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editBreakfast, editDinner, editLunch } from "../state/actions/day.actions";
import { useNavigate } from "react-router-dom";

export default function DayMealsCard(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const d: IDay = props.d;

    const [breakfast, setBreakfast] = React.useState(d.breakfast.name);
    const [lunch, setLunch] = React.useState(d.lunch.name);
    const [dinner, setDinner] = React.useState(d.dinner.name);

    const handleBFChange = (day: IDay) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setBreakfast(event.target.value);
    };

    const handleLChange = (day: IDay) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLunch(event.target.value);
    };

    const handleDChange = (day: IDay) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDinner(event.target.value);
    };

    const handleFinish = (day: IDay) => evt => {
        console.log("Changin breakfast from '" + day.breakfast.name + "' to '" + breakfast + "'.");
        // if there is already a breakfast, edit it
        // if (day.breakfast.slug)
        //     dispatch(editBreakfast(day.slug, breakfast));
        console.log("Changin lunch from '" + day.lunch.name + "' to '" + lunch + "'.");
        // if there is already a lunch, edit it
        // if (day.lunch.slug)
        //     dispatch(editLunch(day.slug, lunch));
        console.log("Changin dinner from '" + day.dinner.name + "' to '" + dinner + "'.");
        // if there is already a dinner, edit it
        // if (day.dinner.slug)
        //     dispatch(editDinner(day.slug, dinner));
        evt.preventDefault();
        navigate("/meals");
    }

    return (
        <div>
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
                            <TextField focused={(d.breakfast.name != undefined) ? true : false} id="add-breakfast" value={breakfast} label="Petit-déjeuner" variant="filled" onChange={handleBFChange(d)} />
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
                            <TextField focused={(d.lunch.name != undefined) ? true : false} id="add-lunch" value={lunch} label="Déjeuner" variant="filled" onChange={handleLChange(d)} />
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
                            <TextField focused={(d.dinner.name != undefined) ? true : false} id="add-dinner" value={dinner} label="Dîner" variant="filled" onChange={handleDChange(d)} />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            <Button color="success" variant="contained" onClick={handleFinish(d)} fullWidth>Terminer</Button>
        </div>
    );
}