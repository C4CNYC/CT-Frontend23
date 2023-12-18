import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { useSnackbar } from "notistack";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useCopyToClipboard } from "@hooks";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface } from "@utils";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { IClass } from "src/redux/interfaces/class.interface";
import { Role } from "src/redux/services/enums/role.enum";
import { useUpdateClassesSettingsMutation } from "src/redux/services/manager/classes-manager";

import ClassroomModal from "../classroom-modal";
import EmailAddressModal from "../email-address-domain";
import { Iconify } from "../iconify";
import {
  CLASS_ROOM_BTN_SX,
  COPY_BIG,
  COPY_BTN_SX,
  DIVIDER_SX,
  EMAIL_BTN_SX,
  FORM_CONTROL_SX,
  HEADER_SX,
  HEADER_TITLE_SX,
  LINK_TEXT_SX,
  RADIO_GROUP_SX,
  RADIO_SX,
  getCopySx,
  getSubtitleFooterSx,
  getSubtitleSx,
} from "./constansts";

interface IShareGroupModalProps {
  children: React.ReactElement;
  schoolClass: IClass & BaseResponseInterface;
}

export default function ShareGroupModal({
  children,
  schoolClass,
}: IShareGroupModalProps): React.ReactElement {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { query } = useRouter();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    schoolClass.setting.request_join_enable ? "true" : "false"
  );
  const [updateClass, { isLoading }] = useUpdateClassesSettingsMutation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const onCopy = (textToCopy: string) => {
    if (textToCopy) {
      copy(textToCopy);
      enqueueSnackbar("Copied!");
    }
  };

  const updateClassJoin = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateClass({
        schoolId: query.schoolId as string,
        classId: query.id as string,
        request_join_enable: (e.target as HTMLInputElement).value === "true",
      }).unwrap();
      enqueueSnackbar("Changes updated!");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const shareLink = `${
    window.location.origin
  }${STUDENT_PATH_DASHBOARD.joinTribe.id(schoolClass.setting.share_token)}`;

  useEffect(() => {
    if (query.onBoarding) {
      handleOpen();
    }
  }, []);

  const subtitleSx = useMemo(() => getSubtitleSx(isLight), [isLight]);
  const copySx = useMemo(() => getCopySx(isLight, theme), [isLight, theme]);
  const subtitleFooterSx = useMemo(
    () => getSubtitleFooterSx(isLight),
    [isLight]
  );

  return (
    <>
      <Stack onClick={handleOpen}>{children}</Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <Box sx={HEADER_SX}>
          <Box display="flex" justifyContent="end" alignItems="center">
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <Iconify icon="jam:close-rectangle-f" width={24} height={24} />
            </IconButton>
          </Box>
          <Typography sx={HEADER_TITLE_SX} variant="h3">
            {schoolClass?.name}
          </Typography>
        </Box>
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Box>
            <Typography
              fontSize="20px"
              color={isLight ? "#292929" : ""}
              variant="h4"
              textAlign="center"
            >
              Share group
            </Typography>
            <Typography sx={subtitleSx} variant="body2">
              Send the link below to invite students to the group.
            </Typography>
          </Box>
          <Box sx={copySx}>
            <Box display="flex" alignItems="center" width="100%">
              <Button sx={COPY_BTN_SX}>
                <Iconify icon="basil:copy-outline" width={18} height={18} />
              </Button>
              <Box ml="10px">
                <Typography>Invite link:</Typography>
                <Typography noWrap sx={LINK_TEXT_SX}>
                  {shareLink}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                onCopy(shareLink);
              }}
              sx={COPY_BIG}
            >
              Copy
            </Button>
          </Box>
          <RoleBasedGuard
            roles={[Role.Manager, Role.Editor, Role.Owner, Role.Admin]}
          >
            <Stack mt="20px" ml="15px" gap="20px">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={(e) => {
                    updateClassJoin(e);
                    handleChange(e);
                  }}
                  sx={RADIO_GROUP_SX}
                >
                  <FormControlLabel
                    value="true"
                    sx={FORM_CONTROL_SX}
                    control={<Radio disabled={isLoading} sx={RADIO_SX} />}
                    label={
                      <Typography color={isLight ? "#292929" : ""} variant="h6">
                        Anyone with the link can join
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="false"
                    disabled={isLoading}
                    control={<Radio sx={RADIO_SX} />}
                    label={
                      <Typography color={isLight ? "#292929" : ""} variant="h6">
                        Only people you approve can join
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Divider
              variant="middle"
              orientation="horizontal"
              sx={DIVIDER_SX}
            />
            <Box ml="15px" mt="28px" mb="28px">
              <Typography variant="h6" sx={subtitleFooterSx}>
                Other ways to add students:
              </Typography>
              <ClassroomModal schoolId={schoolClass?.school?.id ?? ""}>
                <Button fullWidth sx={CLASS_ROOM_BTN_SX}>
                  <Box display="flex" alignItems="center">
                    <SiGoogleclassroom size={24} />
                    <Typography ml={2}> Google Classroom</Typography>
                  </Box>
                  <AiOutlineArrowRight />
                </Button>
              </ClassroomModal>
              <EmailAddressModal
                schoolId={schoolClass?.school?.id ?? ""}
                classId={schoolClass?.id}
              >
                <Button fullWidth sx={EMAIL_BTN_SX}>
                  <Box display="flex" alignItems="center">
                    <MdOutlineMail size={24} />
                    <Typography ml={2}> Email address or domain</Typography>
                  </Box>
                  <AiOutlineArrowRight />
                </Button>
              </EmailAddressModal>
            </Box>
          </RoleBasedGuard>
        </Box>
      </Dialog>
    </>
  );
}
