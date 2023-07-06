import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import nextLink from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

import { MenuPopover } from "@components";
import { PATH_DASHBOARD } from "@routes/paths";
import { useState } from "react";

import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { getLinearGradient } from "@utils";
import { TbShare2 } from "react-icons/tb";
import { useProfileQuery } from "src/redux/services/auth";
import { useGetClassMentorQuery } from "src/redux/services/student/classes-manager";
import ClassInfoHeader from "./ClassInfoToggle";

export default function DefaultClassInfo(): React.ReactElement {
  const { data: student } = useProfileQuery({});
  const { data, isLoading } = useGetClassMentorQuery(
    { id: student?.classes?.[0]?.id as string },
    { skip: !student }
  );
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <>
      {isLoading ? (
        <Skeleton
          sx={{ width: "100%", height: "188px" }}
          variant="rectangular"
          animation="wave"
        />
      ) : (
        <Stack>
          <ClassInfoHeader />
          <Stack
            sx={{
              background: getLinearGradient(
                student?.classes?.[0].cover ?? "#75CF6D"
              ),
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                pb: "65px",
                pt: 1,
                pr: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#fff", textTransform: "uppercase" }}
              >
                GROUP HOME
              </Typography>
              <Typography variant="caption" sx={{ color: "#fff", mx: 1 }}>
                {" "}
                -{" "}
              </Typography>
              <Link
                sx={{ display: "flex", alignItems: "center", color: "#fff" }}
                href={PATH_DASHBOARD.tribes.root}
                component={nextLink}
              >
                <Typography variant="caption"> See All Groups</Typography>
              </Link>
            </Stack>
            <Typography variant="h4" sx={{ color: "#fff", pb: 0.5, pl: 2 }}>
              {student?.classes?.[0]?.name}
            </Typography>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "ceter",
                px: 2,
                pb: 2,
                flexWrap: "wrap",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  py: 1,
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {data ? (
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                      src={data[0]?.avatar ? data[0].avatar : ""}
                      alt=""
                    >
                      &#128540;
                    </Avatar>
                    <Box sx={{ height: "fit-content" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#fff",
                          ml: 1,
                          width: "180px",
                        }}
                      >
                        Teacher: {data[0]?.first_name} {data[0]?.last_name}
                      </Typography>
                    </Box>
                  </Stack>
                ) : null}

                <Stack direction="row" sx={{ pl: { xs: 4, sm: 0 } }}>
                  <FaSchool
                    color="#fff"
                    size="16px"
                    style={{ marginTop: "2px" }}
                  />
                  <Typography variant="subtitle2" sx={{ color: "#fff", ml: 1 }}>
                    {student?.school?.name}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Link
                  sx={{ display: "flex", alignItems: "center", color: "#fff" }}
                  href={PATH_DASHBOARD.friends.root}
                  component={nextLink}
                >
                  <FiUser color="#fff" size="18px" />
                  <Typography variant="button" sx={{ ml: 0.5 }}>
                    Members
                  </Typography>
                </Link>
                <InviteFriendsModal>
                  <Button
                    variant="text"
                    disableRipple
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                      ml: 2,
                      "&:hover": {
                        background: "none",
                      },
                    }}
                  >
                    <TbShare2 color="#fff" size="18px" />
                    <Typography variant="button" sx={{ ml: 0.5 }}>
                      Share
                    </Typography>
                  </Button>
                </InviteFriendsModal>
                <IconButton
                  onClick={handleOpenPopover}
                  sx={{ ml: "30px", p: 0.7 }}
                >
                  <BsThreeDots color="#fff" size="24px" />
                </IconButton>
                <MenuPopover
                  sx={{
                    p: 2,
                    minWidth: "150px",
                  }}
                  open={openPopover}
                  onClose={handleClosePopover}
                >
                  <Button
                    sx={{
                      gap: 1,
                      width: "100%",
                      m: "0 auto",
                      background: "#fff",
                      color: "#75CF6D",
                      "&:hover": {
                        background: "#22A64733",
                      },
                    }}
                  >
                    Details
                  </Button>
                  <Divider flexItem sx={{ my: 1 }} />
                  <Button
                    sx={{
                      gap: 1,
                      width: "100%",
                      m: "0 auto",
                      background: "#fff",
                      color: "#75CF6D",
                      "&:hover": {
                        background: "#22A64733",
                      },
                    }}
                  >
                    Open
                  </Button>
                </MenuPopover>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}
