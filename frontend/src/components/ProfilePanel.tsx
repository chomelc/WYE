import { Avatar, Box, Grid, Typography, Card, CardContent, Divider, Skeleton } from "@mui/material";
import React, { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useGetUsers } from "../lib/api-hooks";
import { FetchState } from "../types";

export default function ProfilePanel() {
    const username = ReactSession.get("username");
    const [users, fetchState, getUsers] = useGetUsers();


    return (
        <div className="container">
            {fetchState === FetchState.DEFAULT && (
                <>
                    {getUsers()}
                </>
            )}
            {fetchState === FetchState.LOADING && <Skeleton variant="rectangular" width={210} height={118} />}
            {fetchState === FetchState.ERROR && (
                <>
                    {getUsers()}
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

                        {users.map((user) => (
                            user.slug == username
                                ?
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Grid container spacing={2} >
                                            <Grid item xs={4}>
                                                <Avatar>{user.initials}</Avatar>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Grid container direction="row-reverse">
                                                    <Grid item>
                                                        <Typography variant="h5" component="div" gutterBottom>
                                                            {user.first_name} {user.last_name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ marginTop: 2 }} variant="inset" />
                                    </CardContent>
                                </Card>
                                : null
                        ))}
                    </Box >
                </>
            )}
        </div>
    );
}