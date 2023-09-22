import NextLink from "next/link";

import { BiLinkExternal } from "react-icons/bi";
import { TbFileCertificate, TbPhoto } from "react-icons/tb";

import { Button, Link, Stack, Typography } from "@mui/material";

export default function LinksSection(): React.ReactElement {
  return (
    <Stack gap={2} px={2} py={4}>
      <Link
        component={NextLink}
        underline="none"
        href="#"
        target="_blank"
        sx={{
          color: "inherit",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TbPhoto size={30} />
        What you’ll build
        <BiLinkExternal size={15} />
      </Link>
      <Button
        variant="text"
        disableRipple
        sx={{
          color: "inherit",
          gap: 1,
          px: 0,
          alignSelf: "flex-start",
          "&:hover": {
            background: "none",
          },
        }}
      >
        <TbFileCertificate size={30} />
        <Typography variant="body1">Sample Certificate</Typography>
      </Button>
      <Link
        component={NextLink}
        underline="none"
        href="#"
        target="_blank"
        sx={{
          color: "inherit",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TbPhoto size={30} />
        Who is this for
        <BiLinkExternal size={15} />
      </Link>
    </Stack>
  );
}
