import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWrapper } from "../helpers/base_query_wrapper";
import { baseQueryWithAuth } from "../helpers/query_with_auth";

export const studentApi = createApi({
  reducerPath: "api/student",
  baseQuery: baseQueryWithAuth(
    baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/student`)
  ),
  tagTypes: [
    "School",
    "Students",
    "Classes",
    "SchoolSettings",
    "SchoolContacts",
    "Assignments",
    "Assignment",
    "Modules",
    "Lessons",
    "Courses",
    "Tasks",
    "Challenges",
    "Progress",
    "Friends",
    "Profile",
    "Projects",
    "Socials",
    "Goal",
  ],
  endpoints: () => ({}),
});
