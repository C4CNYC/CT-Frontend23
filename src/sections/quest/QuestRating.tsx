import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";

import { Box, Button, Card, Divider, Link, Typography } from "@mui/material";

interface Props {
  name: string;
}

export default function QuestRating({ name }: Props): React.ReactElement {
  return (
    <>
      <Card sx={{ p: { xs: "5px 0px", sm: "15px 20px", md: "15px 20px" } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box
              ml={3}
              component="div"
              sx={{ ml: { xs: 1, sm: 3, md: 3, lg: 3 } }}
            >
              <Link href="#" color="inherit">
                <Typography alignItems="center" variant="body2">
                  Quest <BsFillInfoCircleFill style={{ marginLeft: "5px" }} />
                </Typography>
              </Link>
              <Typography variant="h5">{name}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">82%</Typography>
            <Divider
              variant="fullWidth"
              orientation="vertical"
              flexItem
              sx={{ ml: 1, mr: 1, width: 10 }}
            />
            <Button
              endIcon={<RiShareBoxFill />}
              sx={{ fontSize: "18px", ml: 1 }}
            >
              Open
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
}
