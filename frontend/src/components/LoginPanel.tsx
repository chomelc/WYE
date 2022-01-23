import { Box, Button, Card, CardContent, Grid, Typography, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";
import { getUser } from "../state/actions/user.actions";
import { getItems } from "../state/actions/items.actions";

export default function LoginPanel() {
    const navigate = useNavigate();
    
    const users: IUser[] = useSelector(
        (state: UsersState) => state.users)

    const [username, setUsername] = React.useState('');

    const handleUserChange = (event: SelectChangeEvent) => {
        setUsername(event.target.value);
    };

    const dispatch = useDispatch();

    const handleSubmit = evt => {
        evt.preventDefault();
        ReactSession.set("username", username);
        dispatch(getUser(username));
        dispatch(getItems(username));
        navigate("/meals");
    }

    return (
        <Box sx={{ p: 2 }}>
            <Grid container direction="column" alignItems="center">
                <Card style={{ maxWidth: 575, width: "100%" }}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Qui êtes-vous ?
                        </Typography>
                        <Divider sx={{ marginTop: 2 }} variant="inset" />
                        <Box component="form" onSubmit={handleSubmit}>
                            <FormControl fullWidth required>
                                <InputLabel id="user">Utilisateur</InputLabel>
                                <Select
                                    labelId="user"
                                    id="user-select"
                                    value={username}
                                    label="Utilisateur"
                                    onChange={handleUserChange}
                                    color="primary"
                                    style={{ marginBottom: 12 }}
                                >
                                    {users.length > 0 &&  users.map(u => {
                                        return (
                                            <MenuItem key={u.slug} value={u.slug}>
                                                {u.first_name + " " + u.last_name ?? u.slug}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="success" fullWidth>C'est Parti</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Box >
    );
}