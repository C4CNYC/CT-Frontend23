import { m } from "framer-motion";
// @mui
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
import useResponsive from "../../hooks/useResponsive";
// routes
import { PATH_ZONE_ON_STORE } from "../../routes/paths";
// components
import { MotionViewport, varFade } from "../../components/animate";
import Iconify from "../../components/iconify";
import Image from "../../components/image";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeLookingFor(): React.ReactElement {
  const isDesktop = useResponsive("up", "md");

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          <Grid item xs={12} md={4}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              {VisitButton}
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description(): React.ReactElement {
  const isDesktop = useResponsive("up", "md");

  return (
    <Stack
      sx={{
        textAlign: {
          xs: "center",
          md: "left",
        },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.disabled" }}
        >
          Looking For a
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Landing Page Template?
        </Typography>
      </m.div>

      {isDesktop && <m.div variants={varFade().inDown}> {VisitButton} </m.div>}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content(): React.ReactElement {
  return (
    <Box component={m.div} variants={varFade().inUp}>
      <Image
        disabledEffect
        alt="rocket"
        src="/assets/images/home/zone_landing.png"
      />
    </Box>
  );
}

const VisitButton = (
  <Button
    color="inherit"
    size="large"
    variant="outlined"
    target="_blank"
    rel="noopener"
    href={PATH_ZONE_ON_STORE}
    endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
  >
    Visit Zone Landing Page
  </Button>
);
