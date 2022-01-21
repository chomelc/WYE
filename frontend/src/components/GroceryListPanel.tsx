import { Box, Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from "react";
import { ReactSession } from 'react-client-session';

const styles = {
    barredItem: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    none: {}
};

export default function GroceryListPanel() {
    const [checked, setChecked] = React.useState<any[]>([]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const items = new Array();

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [groceries, setGroceries] = React.useState<any[]>([]);
    const username = ReactSession.get("username");

    useEffect(() => {
        fetchGroceries();
    }, [])

    const fetchGroceries = () => {
        fetch("http://192.168.0.10:5000/wye/groceries/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setGroceries(data);
                },
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            )
    }

    const json = JSON.stringify(groceries);
    const json_groceries = JSON.parse(json);

    var user_groceries = json_groceries.filter(o => { return o.g_list.author.slug === username });
    if (user_groceries != undefined) {
        user_groceries.forEach(item => {
            items.push(item)
        });
    }

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
            <Grid container spacing={2} alignContent="center" alignItems="center">
                <Grid item xs={9}>
                    <TextField id="add-item" label="Ajouter un item" variant="filled" color="success" />
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="row-reverse">
                        <IconButton color="success" aria-label="add an item">
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container alignContent="center" alignItems="center">
                <List sx={{ width: '100%' }}>
                    {items.map((value) => {
                        const labelId = `checkbox-list-label-${value.slug}`;

                        return (
                            <ListItem
                                key={value.slug}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(items.indexOf(value.slug))} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(items.indexOf(value.slug)) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText style={checked.filter(index => index == items.indexOf(value.slug))[0] == items.indexOf(value.slug) ? styles.barredItem : styles.none} id={labelId} primary={value.item} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Box>
    )
}