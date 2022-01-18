import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import React from "react";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';

export default function MealsPanel() {
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
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Lundi
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Mardi
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Mercredi
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Jeudi
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Vendredi
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Samedi
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
            <Card sx={{ minWidth: 275, marginBottom:2 }} >
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Dimanche
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Chip label="Date" variant="outlined" />
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
            </Card>
        </Box>
    )
}