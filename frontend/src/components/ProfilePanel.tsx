import { Avatar, Box, Grid, Typography, Card, CardContent, Divider } from "@mui/material";
import { useSelector } from 'react-redux'
import { ReactSession } from 'react-client-session';

export default function ProfilePanel() {
    const user: IUser[] = useSelector(
        (state: UserState) => state.user)

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
            {user.length > 0 && user.map((user) => (
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
            ))}
        </Box >
    );
}