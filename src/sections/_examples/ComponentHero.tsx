import { m } from "framer-motion";
// @mui
import { Container, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// hooks
import useResponsive from "../../hooks/useResponsive";
// utils
import { bgGradient } from "../../utils/cssStyles";
// components
import { MotionContainer, varFade } from "../../components/animate";
import Image from "../../components/image";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(10, 0),
}));

const StyledBg = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  position: "absolute",
  transform: "scaleX(-1)",
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === "light" ? 0.9 : 0.94
    ),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
}));

// ----------------------------------------------------------------------

export default function ComponentHero(): React.ReactElement {
  const isDesktop = useResponsive("up", "sm");

  return (
    <StyledRoot>
      <Container
        component={MotionContainer}
        sx={{
          display: { md: "flex" },
          justifyContent: { md: "space-between" },
        }}
      >
        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" component="h1">
              Components
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography sx={{ color: "text.secondary" }}>
              With huge resource pack making deployment
              <br /> easy and expanding more effectively
            </Typography>
          </m.div>
        </Stack>

        {isDesktop && (
          <m.div variants={varFade().inDown}>
            <Image
              disabledEffect
              alt="hero"
              src="/assets/illustrations/characters/character_7.png"
              sx={{ maxWidth: 320 }}
            />
          </m.div>
        )}
      </Container>

      <StyledBg />
    </StyledRoot>
  );
}
