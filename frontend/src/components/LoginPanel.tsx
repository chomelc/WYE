import { Box, Button, Card, CardContent, Grid, Typography, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";

export default function LoginPanel() {
    const navigate = useNavigate()
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [users, setUsers] = React.useState<any[]>([])

    const [user, setUser] = React.useState('');

    const handleUserChange = (event: SelectChangeEvent) => {
        setUser(event.target.value);
    };

    useEffect(() => {
        fetch("http://192.168.0.10:5000/wye/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const handleSubmit = evt => {
        evt.preventDefault();
        ReactSession.set("username", user);
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
                                    value={user}
                                    label="Utilisateur"
                                    onChange={handleUserChange}
                                    color="primary"
                                    style={{ marginBottom: 12 }}
                                >
                                    {users?.map(u => {
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