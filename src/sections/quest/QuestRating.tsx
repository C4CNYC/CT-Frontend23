import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";
import { TfiStatsUp } from "react-icons/tfi";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from "@mui/material";

import { Image } from "@components";
import { FilterMode, useFilters } from "@hooks";
import { ICourse } from "@types";
import { BaseResponseInterface } from "@utils";
import { ICourseSearchParams } from "src/redux/interfaces/content.interface";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { RootState } from "src/redux/store";

interface Props {
  name?: string;
  cover?: string;
}

export default function QuestRating({
  name,
  cover,
}: Props): React.ReactElement {
  return (
    <>
      <Card sx={{ p: "15px 20px" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            {/* <TfiStatsUp size={40} /> */}
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Image
                src={cover ?? "/assets/icons/files/ic_folder.svg"}
                alt={cover}
                ratio="16/9"
                style={{ objectFit: "contain", padding: 10 }}
              />
            </Box>
            <Box ml={3} component="div">
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
