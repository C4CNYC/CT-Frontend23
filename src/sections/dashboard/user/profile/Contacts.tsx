import { useState } from "react";
// @mui
import { Box, Card, Button, Avatar, Typography, Stack } from "@mui/material";
// @types
import { IUserProfileFollower } from "../../../../@types/user";
// components
import Iconify from "@components/iconify";

// ----------------------------------------------------------------------

type Props = {
  followers: IUserProfileFollower[];
};

export default function Contacts({ followers }: Props) {
  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Contacts
      </Typography>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        Contacts
      </Box>
    </>
  );
}
