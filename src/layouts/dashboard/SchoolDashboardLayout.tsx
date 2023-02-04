import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useGetMySchoolsQuery } from "src/redux/services/manager";
import DashboardLayout from "./DashboardLayout";

type Props = {
  children: React.ReactElement;
};
export default function SchoolDashboardLayout({ children }: Props) {
  const { isLoading } = useGetMySchoolsQuery();

  return (
    <DashboardLayout>
      {isLoading ? <CircularProgress /> : children}
    </DashboardLayout>
  );
}
