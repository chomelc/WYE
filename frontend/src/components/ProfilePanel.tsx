import { Avatar, Box, Grid, Typography, Card, CardContent, Divider } from "@mui/material";

export default function ProfilePanel() {
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
                            <Avatar>CC</Avatar>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        Clémence Chomel
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