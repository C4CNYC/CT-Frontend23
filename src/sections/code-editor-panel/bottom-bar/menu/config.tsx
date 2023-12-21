import nextLink from "next/link";
import { type ReactNode } from "react";

import { BsFolder2Open } from "react-icons/bs";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary, MdOutlineUpload } from "react-icons/md";

import { Link } from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

import { type SupportedLang } from "../../work-space";
import PublishModal from "../modals/publish";

interface GetActions {
  code: string;
  language: SupportedLang;
}

export interface Action {
  icon: ReactNode;
  name: string;
  color: string;
  isPublic: boolean;
}

export const getActions = ({ code, language }: GetActions): Action[] => [
  {
    icon: (
      <PublishModal isPublic={true} code={code} language={language}>
        <MdOutlineUpload size="24px" color="#FBDD3F" />
      </PublishModal>
    ),
    name: "publist_to_gallery",
    color: "#FBDD3F",
    isPublic: true,
  },
  {
    icon: (
      <Link
        component={nextLink}
        href={STUDENT_PATH_DASHBOARD.gallery.publicProject}
        sx={LINK_SX}
      >
        <MdOutlinePhotoLibrary size="22px" color="#FBDD3F" />
      </Link>
    ),
    name: "go_to_gallery",
    color: "#FBDD3F",
    isPublic: true,
  },

  {
    icon: (
      <PublishModal isPublic={false} code={code} language={language}>
        <IoSaveOutline size="22px" color="#43D4DD" />
      </PublishModal>
    ),
    name: "save_to_folder",
    color: "#43D4DD",
    isPublic: false,
  },
  {
    icon: (
      <Link
        component={nextLink}
        href={STUDENT_PATH_DASHBOARD.gallery.privateProject}
        sx={LINK_SX}
      >
        <BsFolder2Open size="22px" color="#43D4DD" />
      </Link>
    ),
    name: "open_folder",
    color: "#43D4DD",
    isPublic: false,
  },
];

const LINK_SX = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
