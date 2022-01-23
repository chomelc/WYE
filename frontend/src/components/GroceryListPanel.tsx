import { Box, Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from "react";
import { ReactSession } from 'react-client-session';
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem } from "../state/actions/items.actions";

const styles = {
    barredItem: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    none: {}
};

export default function GroceryListPanel() {
    const connected_user = ReactSession.get("username");
    const dispatch = useDispatch();
    const [itemToAdd, setItemToAdd] = React.useState('');
    const items: IItem[] = useSelector(
        (state: ItemState) => state.items)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAdd(event.target.value);
    };

    const handleDelete = (username: string, item: string) => evt => {
        console.log("Deleting " + item + " from " + username + "'s list.");
        dispatch(deleteItem(username, item));
    }

    const handleCheck = (username: string, item: string, isChecked: boolean) => evt => {
        dispatch(editItem(username, item, isChecked));
    }

    const handleAdd = (username: string, item: string) => evt => {
        console.log("Adding " + item + " to " + username + "'s list.");
        dispatch(addItem(username, item));
        setItemToAdd('');
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
                    <TextField id="add-item" value={itemToAdd} label="Ajouter un item" variant="filled" color="success" onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="row-reverse">
                        <IconButton color="success" onClick={handleAdd(connected_user, itemToAdd)} aria-label="add an item">
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container alignContent="center" alignItems="center">
                <List sx={{ width: '100%' }}>
                    {items.length > 0 && items.map((item) => (
                        <ListItem
                            key={item.slug}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={handleDelete(item.g_list.author.slug, item.slug)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleCheck(item.g_list.author.slug, item.slug, !item.is_checked)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={item.is_checked}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.slug}` }}
                                    />
                                </ListItemIcon>
                                <ListItemText style={item.is_checked ? styles.barredItem : styles.none} id={`checkbox-list-label-${item.slug}`} primary={item.item} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Box >
    );
}
