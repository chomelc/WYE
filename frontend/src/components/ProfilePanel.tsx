import { Avatar, Box, Grid, Typography, Card, CardContent, Divider } from "@mui/material";
import React, { useEffect } from 'react';
import { ReactSession } from 'react-client-session';

export default function ProfilePanel() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [users, setUsers] = React.useState<any[]>([]);
    let firstName;
    let lastName;
    let initials;

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        fetch("http://192.168.0.10:5000/wye/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            )
    }

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        const username = ReactSession.get("username");
        const json = JSON.stringify(users);
        const json_users = JSON.parse(json);

        var connected_user = json_users.find(o => { return o.slug === username });
        if (connected_user != undefined) {
            firstName = connected_user.first_name;
            lastName = connected_user.last_name;
            initials = connected_user.initials;
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
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Grid container spacing={2} >
                            <Grid item xs={4}>
                                <Avatar>{initials}</Avatar>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {firstName} {lastName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginTop: 2 }} variant="inset" />
                    </CardContent>
                </Card>
            </Box >
        );
    }
}