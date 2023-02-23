import { m } from "framer-motion";
// @mui
import { Box, Button, Container, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// utils
import { bgGradient } from "../../utils/cssStyles";
// routes
import { PATH_FREE_VERSION, PATH_MINIMAL_ON_STORE } from "../../routes/paths";
// components
import { MotionViewport, varFade } from "../../components/animate";
import Iconify from "../../components/iconify";
import Image from "../../components/image";

// ----------------------------------------------------------------------

export default function HomeAdvertisement(): React.ReactElement {
  const theme = useTheme();

  return (
    <Container component={MotionViewport}>
      <Stack
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        sx={{
          ...bgGradient({
            direction: "135deg",
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
          borderRadius: 2,
          pb: { xs: 5, md: 0 },
        }}
      >
        <Content />
        <Description />
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

function Description(): React.ReactElement {
  return (
    <Box
      sx={{
        textAlign: {
          xs: "center",
          md: "left",
        },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: "common.white", mb: 5, typography: "h2" }}
      >
        Get started with
        <br /> minimal kit today
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="contained"
            target="_blank"
            rel="noopener"
            href={PATH_MINIMAL_ON_STORE}
            sx={{
              color: "grey.800",
              bgcolor: "common.white",
            }}
          >
            Purchase Now
          </Button>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            target="_blank"
            rel="noopener"
            href={PATH_FREE_VERSION}
            endIcon={
              <Iconify
                icon="eva:external-link-fill"
                width={16}
                sx={{ mr: 0.5 }}
              />
            }
            sx={{
              color: "common.white",
              "&:hover": { borderColor: "currentColor" },
            }}
          >
            Get Free Version
          </Button>
        </m.div>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Content(): React.ReactElement {
  return (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <m.div
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="rocket"
          src="/assets/images/home/rocket.png"
          sx={{ maxWidth: 460 }}
        />
      </m.div>
    </Stack>
  );
}
