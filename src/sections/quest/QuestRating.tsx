import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";
import { TfiStatsUp } from "react-icons/tfi";

import { Box, Button, Card, Divider, Link, Typography } from "@mui/material";

interface Props {
  title?: string;
  progress?: string;
}
export default function QuestRating({
  title,
  progress,
}: Props): React.ReactElement {
  return (
    <>
      <Card sx={{ p: "15px 20px" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <TfiStatsUp size={40} />
            <Box ml={3}>
              <Link href="#" color="inherit">
                <Typography alignItems="center" variant="body2">
                  Quest <BsFillInfoCircleFill style={{ marginLeft: "5px" }} />
                </Typography>
              </Link>
              <Typography variant="h5">
                {title}
                Wild Foundation | Web Dev Basic
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              {progress}
              82%
            </Typography>
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
