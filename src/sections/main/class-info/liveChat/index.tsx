import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { TbMessage } from "react-icons/tb";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import Grid from '@mui/material/Grid';
import React from "react";
import { Paper, Typography } from "@mui/material";
import { useTranslate } from "src/utils/translateHelper";
import { CHAT_BUTTON_SX } from "../constants";
import LiveChatLeft from "./LiveChatLeft";
import LiveChatRight from "./LiveChatRight";

type Anchor = "top" | "left" | "bottom" | "right";

export default function LiveChat() {
    const [state, setState] = React.useState({
        right: false,
        // if needs to change direction in future
        // left: false,
        // bottom: false,
        // right: false,
    });

    const translate = useTranslate()

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" ||
                        (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ display: "flex", width: "80vw", flexDirection: "row" }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            <Grid container component={Paper} sx={{
                width: '100%',
                height: '100vh',
            }}>
                <LiveChatLeft />
                <LiveChatRight />
            </Grid>
        </Box>
    );

    return (
        <div>
            {(["right"] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button variant="text" sx={CHAT_BUTTON_SX} onClick={toggleDrawer(anchor, true)}>
                        <TbMessage color="#fff" size="18px" />
                        <Typography variant="button" sx={{ ml: 0.5 }}>
                            {translate("chat")}
                        </Typography>
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}