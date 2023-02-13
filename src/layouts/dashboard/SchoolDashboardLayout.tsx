import { Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { m } from "framer-motion";
import Link from "next/link";
import React from "react";
import { PageNotFoundIllustration } from "src/assets/illustrations";
import { MotionContainer, varBounce } from "src/components/animate";
import { useGetMySchoolsQuery } from "src/redux/services/manager";
import CompactLayout from "../compact";
import DashboardLayout from "./DashboardLayout";

type Props = {
  children: React.ReactElement;
};
export default function SchoolDashboardLayout({ children }: Props) {
  const { data, isLoading } = useGetMySchoolsQuery();

  console.log(!data?.data.length && !isLoading)

  if (!data?.data.length && !isLoading) {
    return (
      <CompactLayout>
           <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, any school found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            Sorry, you don't have access to any shool. Pleas contact with you administrator.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={Link} href="/" size="large" variant="contained">
          Contact Admin
        </Button>
      </MotionContainer>
      </CompactLayout>
    )
  }

  return (
    <DashboardLayout>
      {isLoading ? <CircularProgress /> : children}
    </DashboardLayout>
  );
}
