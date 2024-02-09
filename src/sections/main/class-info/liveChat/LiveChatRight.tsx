import { Box, Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from "@mui/material";
import { TbSend } from 'react-icons/tb';

export default function LiveChatRight() {
    return (
        <Grid item xs={9}>
            <List sx={{ height: '85vh', overflowY: 'auto' }}>
                <ListItem key="1">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText sx={{ textAlign: 'right' }} primary="Hey man, What's up ?"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText sx={{ textAlign: 'right' }} secondary="09:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="2">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText sx={{ textAlign: 'left' }} primary="Hey, Iam Good! What about you ?"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText sx={{ textAlign: 'left' }} secondary="09:31"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="3">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText sx={{ textAlign: 'right' }} primary="Cool. i am good, let's catch up!"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText sx={{ textAlign: 'right' }} secondary="10:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                </Grid>
                <Grid xs={1} sx={{ textAlign: 'right' }}>
                    <Fab color="primary" aria-label="add"><TbSend /></Fab>
                </Grid>
            </Grid>
        </Grid>
    );
}