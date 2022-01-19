import { Avatar, Box, Grid, Typography, Card, CardContent, Divider } from "@mui/material";
import React, { useEffect } from 'react';
import { ReactSession } from 'react-client-session';

export default function ProfilePanel() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [users, setUsers] = React.useState<any[]>([]);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [initials, setInitials] = React.useState("");

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

    const username = ReactSession.get("username");
    const json = JSON.stringify(users);
    const json_users = JSON.parse(json);

    var connected_user = json_users.find(o=>o.slug==username);
    console.log(connected_user);
    // setFirstName(connected_user.first_name);
    // setLastName(connected_user.last_name);
    // setInitials(connected_user.initials);

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