import nextLink from "next/link";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdCopyAll } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";

import {
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { MenuPopover, useSnackbar } from "@components";
import { useCopyToClipboard } from "@hooks";
import { PATH_DASHBOARD } from "@routes/paths";
import InviteFriendsModal from "@sections/invite-friends/InviteFriendsModal";
import { getLinearGradient } from "@utils";

import ClassInfoMain from "./ClassInfoMain";
import ClassInfoToggle from "./ClassInfoToggle";
import { useGetClassQuery } from "src/redux/services/student/classes-manager";
import { useRouter } from "next/router";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

export default function DefaultClassInfo(): React.ReactElement {
  const { query } = useRouter();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const { data } = useGetClassQuery({ id: query.id as string })

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const onCopy = (textToCopy: string) => {
    if (textToCopy) {
      copy(textToCopy);
      enqueueSnackbar("Copied!");
    }
  };

  return (
    <>
      <Stack>
        <ClassInfoToggle />
        <Stack
          sx={{
            background: getLinearGradient(data?.cover ?? "#75CF6D"),
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",
            color: "#fff",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              pb: "65px",
              pt: 1,
              px: 2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ gap: 1, flexWrap: { xs: "wrap" } }}
            >
              <Typography variant="subtitle2">Join-code:</Typography>
              <Button
                onClick={() => { onCopy("AHWE2383"); }}
                sx={{ gap: 0.5, color: "inherit", p: 0 }}
              >
                <Typography variant="subtitle2">AHWE2383</Typography>
                <MdCopyAll size={20} style={{ marginBottom: "2px" }} />
              </Button>
            </Stack>
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
            <ClassInfoMain data={data}/>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                maxHeight: "20px",
                pt: { xs: 2, sm: 0 },
                m: { xs: "10px auto", sm: 0 },
              }}
            >
              <Link
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  gap: 0.5,
                }}
                href={`${STUDENT_PATH_DASHBOARD.friends.root}?class_id=${query.id}`}
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
                onClose={() => { setOpenPopover(null) }}
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
    </>
  );
}
