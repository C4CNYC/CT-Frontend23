// next
import Head from "next/head";
// @mui
import {
  Box,
  CardHeader,
  Container,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// routes
import { PATH_PAGE } from "@routes/paths";
// layouts
import MainLayout from "../../../layouts/main";
// components
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import Label from "@components/label";

// ----------------------------------------------------------------------

const COLORS = [
  "default",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

// ----------------------------------------------------------------------

DemoLabelPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function DemoLabelPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Extra Components: Label | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "grey.200" : "grey.800",
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Label"
            links={[
              {
                name: "Components",
                href: PATH_PAGE.components,
              },
              { name: "Label" },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={3}>
          <Block title="Filled">
            {COLORS.map((color) => (
              <Tooltip key={color} title={color}>
                <Label color={color} variant="filled">
                  {color}
                </Label>
              </Tooltip>
            ))}
          </Block>

          <Block title="Outlined">
            {COLORS.map((color) => (
              <Label key={color} color={color} variant="outlined">
                {color}
              </Label>
            ))}
          </Block>

          <Block title="Soft">
            {COLORS.map((color) => (
              <Label key={color} color={color} variant="soft">
                {color}
              </Label>
            ))}
          </Block>

          <Block title="With Icon">
            <Label
              variant="filled"
              color="primary"
              startIcon={<Iconify icon="eva:email-fill" />}
            >
              Start Icon
            </Label>

            <Label
              variant="filled"
              color="primary"
              endIcon={<Iconify icon="eva:email-fill" />}
            >
              End Icon
            </Label>

            <Label
              variant="outlined"
              color="primary"
              startIcon={<Iconify icon="eva:email-fill" />}
            >
              Start Icon
            </Label>

            <Label
              variant="outlined"
              color="primary"
              endIcon={<Iconify icon="eva:email-fill" />}
            >
              End Icon
            </Label>

            <Label
              color="primary"
              startIcon={<Iconify icon="eva:email-fill" />}
            >
              Start Icon
            </Label>

            <Label color="primary" endIcon={<Iconify icon="eva:email-fill" />}>
              End Icon
            </Label>
          </Block>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

interface BlockProps {
  title?: string;
  children: React.ReactNode;
}

export function Block({
  title,
  children,
}: BlockProps): React.ReactElement | null {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}
      <Box
        sx={{
          p: 5,
          minHeight: 180,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          "& > *": { mx: 1 },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
