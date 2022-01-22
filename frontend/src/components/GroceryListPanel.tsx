import { Box, Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from "react";
import { ReactSession } from 'react-client-session';
import { FetchState, ItemData } from "../types";
import { useGetItems } from "../lib/api-hooks";

const styles = {
    barredItem: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    none: {}
};

export default function GroceryListPanel() {
    const [items, fetchState, getItems] = useGetItems();
    const username = ReactSession.get("username");

    return (
        <div className="container">
            {fetchState === FetchState.DEFAULT && (
                <>
                    {getItems()}
                </>
            )}
            {fetchState === FetchState.LOADING && <Skeleton variant="rectangular" width={210} height={118} />}
            {fetchState === FetchState.ERROR && (
                <>
                    {getItems()}
                </>
            )}
            {fetchState === FetchState.SUCCESS && (
                <>
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
                                {items.map((item) => (
                                    item.g_list.author.slug == username
                                        ?
                                        <ListItem
                                            key={item.slug}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={item.is_checked}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.slug}` }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText style={ item.is_checked ? styles.barredItem : styles.none} id={`checkbox-list-label-${item.slug}`} primary={item.item} />
                                            </ListItemButton>
                                        </ListItem>
                                        : null
                                ))}
                            </List>
                        </Grid>
                    </Box >
                </>
            )}
        </div >
    );
}