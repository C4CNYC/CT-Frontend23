import NextLink from "next/link";

import { format, formatDistanceToNow } from "date-fns";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { RiExternalLinkLine } from "react-icons/ri";

import { Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "src/components/iconify";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { useUpdateAssignmentMutation } from "src/redux/services/manager/assignments-manager";

interface Props {
  item: IAssignment;
  schoolId: string;
}

export default function QuestItem({
  item,
  schoolId,
}: Props): React.ReactElement {
  const [updateAssignment] = useUpdateAssignmentMutation();

  const pinAssignment = () => {
    if (item?.meta?.pin) {
      updateAssignment({
        schoolId,
        assignmentId: item.id,
        meta: { ...item.meta, pin: false },
      });
    } else {
      updateAssignment({
        schoolId,
        assignmentId: item.id,
        meta: { ...item.meta, pin: true },
      });
    }
  };
  return (
    <Stack
      sx={{
        backgroundColor: "#E6F5FD",
        borderRadius: "10px",
        py: 1,
        px: 2,
        flexDirection: { md: "row" },
      }}
    >
      <Stack sx={{ width: "100%", gap: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={2} sx={{ flexDirection: { sm: "row" } }}>
            {item.active && (
              <Typography
                sx={{ color: "#0198ED", display: "inline-flex" }}
                variant="subtitle2"
              >
                Live Now
                <HiOutlineStatusOnline
                  size={20}
                  style={{ marginLeft: "3px" }}
                />
              </Typography>
            )}
            <Typography variant="body2">
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </Typography>
            <Typography variant="body2">
              Due: {format(new Date(item.end_date), "MM.dd.yyyy")}
            </Typography>
          </Stack>
          <Typography>{item?.course?.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" color="#364954">
            {item.name}
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Iconify icon="bx:award" sx={{ color: "#EE467A" }} />
            <Iconify icon="flat-color-icons:ok" sx={{ color: "#75CF6D" }} />
            <Typography variant="h6" whiteSpace="nowrap">
              82%
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Link
            component={NextLink}
            href="#"
            underline="none"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              color: "inherit",
            }}
          >
            Keep Coding{" "}
            <Iconify
              icon="maki:arrow"
              width={18}
              style={{ marginLeft: "3px" }}
            />
          </Link>
          <Link
            component={NextLink}
            href="#"
            underline="none"
            sx={(theme) => ({
              display: "inline-flex",
              alignItems: "center",
              color: theme.palette.grey[500],
            })}
          >
            See more
            <RiExternalLinkLine size={15} style={{ marginLeft: "3px" }} />
          </Link>
        </Stack>
      </Stack>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={(theme) => ({
          ml: 2,
          mr: 1,
          borderLeftWidth: "2px",
          borderColor: theme.palette.grey[500],
        })}
      />
      <Stack
        alignSelf="flex-end"
        sx={(theme) => ({
          color: theme.palette.grey[500],
          flexDirection: { xs: "row", sm: "row", md: "column" },
        })}
      >
        <IconButton sx={{ alignSelf: "flex-end" }} onClick={pinAssignment}>
          {item?.meta?.pin ? (
            <Iconify icon="bi:pin-fill" width={22} />
          ) : (
            <Iconify icon="bi:pin" width={22} />
          )}
        </IconButton>
        <Stack direction="row">
          <IconButton>
            <Iconify icon="ion:share-outline" width={22} />
          </IconButton>
          <IconButton>
            <Iconify icon="pepicons-pop:dots-y" width={22} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
