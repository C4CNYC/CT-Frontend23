import Link from "next/link";
import React, { useEffect } from "react";

import { m } from "framer-motion";

import { Button, Typography } from "@mui/material";

import { MotionContainer, varBounce } from "@components";
import TeacherSkeletonPanel from "@sections/teacher-panel/code-panel/teacher-skeleton-panel/TeacherSkeletonPanel";
import { PageNotFoundIllustration } from "src/assets/illustrations";
import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";
import { setSchool } from "src/redux/slices/manager";
import { RootState, dispatch, useSelector } from "src/redux/store";

import CompactLayout from "../compact";
import DashboardLayout from "./DashboardLayout";

interface Props {
  children: React.ReactElement;
  isFullScreen?: boolean;
}
export function SchoolDashboardLayout({
  children,
  isFullScreen,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetMySchoolsQuery({});
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  useEffect(() => {
    if (!data?.data) return;
    dispatch(
      setSchool(
        !(schoolId === "") ? schoolId : data.data[0] ? data.data[0].id : ""
      )
    );
  }, [data]);

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
              Sorry, you don't have access to any shool. Pleas contact with you
              administrator.
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
    );
  }

  if (isFullScreen) return isLoading ? <TeacherSkeletonPanel /> : children;

  return <DashboardLayout>{isLoading ? <></> : children}</DashboardLayout>;
}
