import {
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
import { FiUser } from "react-icons/fi";

import { MenuPopover, useSnackbar } from "@components";
import { PATH_DASHBOARD } from "@routes/paths";
import { useState } from "react";

import { useCopyToClipboard } from "@hooks";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { getLinearGradient } from "@utils";
import { MdCopyAll } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";
import { useProfileQuery } from "src/redux/services/auth";
import { useGetClassMentorQuery } from "src/redux/services/student/classes-manager";
import ClassInfoMain from "./ClassInfoMain";
import ClassInfoToggle from "./ClassInfoToggle";

export default function DefaultClassInfo(): React.ReactElement {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [textToCopy] = useState("AHWE2383");
  const { data: student } = useProfileQuery();
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

  const onCopy = () => {
    if (textToCopy) {
      copy(textToCopy);
      enqueueSnackbar("Copied!");
    }
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
          <ClassInfoToggle />
          <Stack
            sx={{
              background: getLinearGradient(
                student?.classes?.[0].cover ?? "#75CF6D"
              ),
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
              color: "#fff",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                pb: "65px",
                pt: 1,
                pr: 2,
              }}
            >
              <Stack direction="row" alignItems="center" sx={{ gap: 1, ml: 1 }}>
                <Typography variant="subtitle2">Join-code:</Typography>
                <Button onClick={onCopy} sx={{ gap: 0.5, color: "inherit" }}>
                  <Typography variant="subtitle2">{textToCopy}</Typography>
                  <MdCopyAll size={20} style={{ marginBottom: "2px" }} />
                </Button>
              </Stack>
              <Stack direction="row">
                <Typography
                  variant="caption"
                  sx={{ textTransform: "uppercase" }}
                >
                  GROUP HOME
                </Typography>
                <Typography variant="caption" sx={{ mx: 1 }}>
                  {" "}
                  -{" "}
                </Typography>
                <Link
                  sx={{
                    color: "inherit",
                  }}
                  typography="caption"
                  href={PATH_DASHBOARD.tribes.root}
                  component={nextLink}
                >
                  See All Groups
                </Link>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-end",
                px: 2,
                pb: 2,
                flexWrap: "wrap",
              }}
            >
              <ClassInfoMain />
              <Stack
                direction="row"
                alignItems="center"
                sx={{ maxHeight: "20px" }}
              >
                <Link
                  sx={{ display: "flex", alignItems: "center", color: "#fff" }}
                  href={PATH_DASHBOARD.friends.root}
                  component={nextLink}
                  typography="button"
                >
                  <FiUser color="#fff" size="18px" />
                  Members
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
