import { Box, Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { type } from "os";

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

    const items = ["lait", "oeufs", "fromage", "beurre"];

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
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(items.indexOf(value))} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(items.indexOf(value)) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText style={ checked.filter(index => index == items.indexOf(value))[0] == items.indexOf(value) ? styles.barredItem : styles.none } id={labelId} primary={value.charAt(0).toUpperCase() + value.slice(1)} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Box>
    )
}