import nextLink from "next/link";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdCopyAll } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";

import {
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";

import { MenuPopover, useSettingsContext, useSnackbar } from "@components";
import { useCopyToClipboard } from "@hooks";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import ClassPreferences from "@sections/dashboard/classes/modal";
import { BaseResponseInterface, getLinearGradient } from "@utils";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import ShareGroupModal from "src/components/share-group-modal";
import { IClass } from "src/redux/interfaces/class.interface";
import { Role } from "src/redux/services/enums/role.enum";
import {
  useUpdateClassesAvatarMutation,
  useUpdateClassesMutation,
} from "src/redux/services/manager/classes-manager";

import ClassInfoMain from "./ClassInfoMain";
import ClassInfoToggle from "./ClassInfoToggle";
import {
  JOIN_STACK_SX,
  MAIN_CLASS_INFO_STACK_SX,
  MEMBERS_LINK_SX,
  POPOVER_EDIT_BTN_SX,
  SHARE_BUTTON_SX,
  SHARE_TOKEN_BTN_SX,
} from "./constants";

interface IDefaultClassInfoProps {
  classData: IClass & BaseResponseInterface;
}

export default function DefaultClassInfo({
  classData,
}: IDefaultClassInfoProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { themeStretch } = useSettingsContext();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const onCopy = (textToCopy: string) => {
    if (textToCopy) {
      copy(textToCopy);
      enqueueSnackbar("Copied!");
    }
  };

  const [updateClassByManager, { isLoading: updateResult }] =
    useUpdateClassesMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();

  const handleEditClass = async (
    id: string,
    name: string,
    description: string,
    cover: string,
    uploadedFile?: File
  ): Promise<void> => {
    try {
      await updateClassByManager({
        schoolId: classData?.school?.id as string,
        classId: id,
        name,
        description,
        cover,
      }).unwrap();
      if (uploadedFile) {
        const file = new FormData();
        file.append("file", uploadedFile);
        await updateClassAvatar({
          schoolId: classData?.school?.id as string,
          classId: id,
          file,
        }).unwrap();
      }
      enqueueSnackbar("Class updated successfuly!");
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Stack sx={{ mx: { lg: -2 } }}>
        <ClassInfoToggle />
        <Stack
          sx={{
            background: getLinearGradient(classData?.cover ?? "#75CF6D"),
            color: "#fff",
            px: 4,
          }}
        >
          <Container maxWidth={themeStretch ? false : "lg"} disableGutters>
            <Stack direction="row" sx={JOIN_STACK_SX}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ gap: 1, flexWrap: { xs: "wrap" } }}
              >
                <Typography variant="subtitle2">Join-code:</Typography>
                <Button
                  onClick={() => {
                    onCopy(classData?.setting?.share_token);
                  }}
                  sx={SHARE_TOKEN_BTN_SX}
                >
                  <Typography variant="subtitle2">
                    {classData?.setting?.share_token}
                  </Typography>
                  <MdCopyAll size={20} style={{ marginBottom: "2px" }} />
                </Button>
              </Stack>

              <Link
                sx={{
                  color: "inherit",
                }}
                typography="caption"
                href={STUDENT_PATH_DASHBOARD.tribes.root}
                component={nextLink}
              >
                See All Groups
              </Link>
            </Stack>

            <Stack
              direction={isMobile ? "column" : "row"}
              sx={MAIN_CLASS_INFO_STACK_SX}
            >
              <ClassInfoMain classData={classData} />
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  maxHeight: "20px",
                }}
              >
                <Link
                  sx={MEMBERS_LINK_SX}
                  href={`${STUDENT_PATH_DASHBOARD.friends.root}?class_id=${classData.id}`}
                  component={nextLink}
                  typography="button"
                >
                  <FiUser color="#fff" size="18px" />
                  {!isMobile ? "Members" : ""}
                </Link>
                <ShareGroupModal schoolClass={classData}>
                  <Button variant="text" disableRipple sx={SHARE_BUTTON_SX}>
                    <TbShare2 color="#fff" size="18px" />
                    <Typography variant="button" sx={{ ml: 0.5 }}>
                      {!isMobile ? "Share" : ""}
                    </Typography>
                  </Button>
                </ShareGroupModal>
                <RoleBasedGuard roles={[Role.Manager, Role.Admin, Role.Owner]}>
                  <IconButton
                    onClick={handleOpenPopover}
                    sx={{ ml: 2, p: 0.7 }}
                  >
                    <BsThreeDots color="#fff" size="24px" />
                  </IconButton>
                </RoleBasedGuard>
                <MenuPopover
                  sx={{ minWidth: "120px" }}
                  open={openPopover}
                  onClose={() => {
                    setOpenPopover(null);
                  }}
                >
                  <ClassPreferences
                    updateClass={(
                      name: string,
                      description: string,
                      cover: string,
                      uploadedFile?: File
                    ) => {
                      handleEditClass(
                        classData.id,
                        name,
                        description,
                        cover,
                        uploadedFile
                      );
                    }}
                    defaultValues={{
                      name: classData.name,
                      description: classData.description ?? "",
                      cover: classData.cover ?? "",
                    }}
                    rowId={classData.id}
                    updateResult={updateResult}
                    schoolId={classData?.school?.id}
                  >
                    <Button sx={POPOVER_EDIT_BTN_SX}>Edit</Button>
                  </ClassPreferences>
                </MenuPopover>
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </>
  );
}
