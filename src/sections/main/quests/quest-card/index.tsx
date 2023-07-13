import NextLink from "next/link";

import { HiOutlineStatusOnline } from "react-icons/hi";
import { RiExternalLinkLine } from "react-icons/ri";

import { Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "src/components/iconify";

export default function QuestsTab() {
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
            <Typography
              sx={{ color: "#0198ED", display: "inline-flex" }}
              variant="subtitle2"
            >
              Live Now
              <HiOutlineStatusOnline size={20} style={{ marginLeft: "3px" }} />
            </Typography>
            <Typography variant="body2">3 hours ago</Typography>
            <Typography variant="body2">Due: Not Available</Typography>
          </Stack>
          <Typography sx={{}}>course</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" color="#364954">
            Wild Foundations | Web-Dev for Everyone
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
        <IconButton sx={{ alignSelf: "flex-end" }}>
          <Iconify icon="tabler:pinned" width={22} />
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
