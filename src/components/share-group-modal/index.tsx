import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

interface IShareGroupModalProps {
  children: React.ReactElement;
  schoolClass: IClass & BaseResponseInterface;
}

export default function ShareGroupModal({
  children,
  schoolClass,
}: IShareGroupModalProps): React.ReactElement {
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
        <Box
          sx={{
            backgroundColor: "#60ced2",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            p: 1,
          }}
        >
          <Box display="flex" justifyContent="end" alignItems="center">
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <Iconify icon="jam:close-rectangle-f" width={24} height={24} />
            </IconButton>
          </Box>
          <Typography
            mt="35px"
            ml="32px"
            mb="55px"
            variant="h3"
            color="white"
            fontSize="32px"
          >
            {schoolClass?.name}
          </Typography>
        </Box>
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Box>
            <Typography
              fontSize="20px"
              color="#292929"
              variant="h4"
              textAlign="center"
            >
              Share group
            </Typography>
            <Typography
              fontSize="16px"
              color="#4f4f4f"
              mt="12px"
              mb="40px"
              textAlign="center"
              variant="body2"
            >
              Send the link below to invite students to the group.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f0f0f0",
              width: "100%",
              height: "55px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
              px: 1,
            }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <Button
                sx={{
                  background: "#f9f9f9",
                  color: "#000",
                  pointerEvents: "none",
                  "&:hover": {
                    background: "#bebebe",
                  },
                  width: "36px",
                  height: "36px",
                  m: "0px 8px",
                  display: { xs: "none" },
                }}
              >
                <Iconify icon="basil:copy-outline" width={18} height={18} />
              </Button>
              <Box ml="10px">
                <Typography>Invite link:</Typography>
                <Typography
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "180px",
                  }}
                >
                  {shareLink}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                onCopy(shareLink);
              }}
              sx={{
                background: "#d1329e",
                "&:hover": {
                  background: "#c31a8b",
                },
                width: "64px",
                height: "36px",
                m: "6px 12px",
              }}
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
                  sx={{
                    fontSize: "24px",
                    mb: "24px",
                  }}
                >
                  <FormControlLabel
                    value="true"
                    sx={{
                      mb: "24px",
                      mt: "10px",
                    }}
                    control={
                      <Radio
                        disabled={isLoading}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d1329e",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography color="#292929" variant="h6">
                        Anyone with the link can join
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="false"
                    disabled={isLoading}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#d1329e",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography color="#292929" variant="h6">
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
              sx={{
                mt: "10px",
                mb: "10px",
                background: "#E6F5FD",
                borderRightWidth: "4px",
                borderRadius: 2,
              }}
            />
            <Box ml="15px" mt="28px" mb="28px">
              <Typography
                variant="h6"
                fontSize="16px"
                m="0px 0px 13px"
                color="#292929"
              >
                Other ways to add students:
              </Typography>
              <ClassroomModal schoolId={schoolClass?.school?.id ?? ""}>
                <Button
                  fullWidth
                  sx={{
                    background: "#f9f9f9",
                    color: "#000",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    mb: "16px",
                    p: "18px",
                    "&:hover": {
                      background: "#bebebe",
                    },
                  }}
                >
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
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#f9f9f9",
                    color: "#000",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    p: "18px",
                    "&:hover": {
                      background: "#bebebe",
                    },
                  }}
                >
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
