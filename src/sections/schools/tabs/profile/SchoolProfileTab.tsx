import { useCallback, useState } from "react";

import { Card, Grid, Stack, Typography } from "@mui/material";

import { UploadAvatar } from "@components";
import { fData } from "@utils";
import { useGetSchoolProfileQuery } from "src/redux/services/manager/schools-manager";
import { useTranslate } from "src/utils/translateHelper";

import SkeletonProfileTab from "./SkeletomProfileTab";
import ProfileAbout from "./components/ProfileAbout";
import ProfileSocialInfo from "./components/ProfileSocialInfo";
import ProfileUsersInfo from "./components/ProfileUsersInfo";
import SchoolProfileForm from "./form/SchoolProfileForm";

interface ISchoolProfileTabProps {
  schoolId: string;
}

export default function SchoolProfileTab({
  schoolId,
}: ISchoolProfileTabProps): React.ReactElement | null {
  const [imgValue, setImgValue] = useState<File[]>([]);
  const translate = useTranslate();
  const { data, isLoading } = useGetSchoolProfileQuery(
    { schoolId },
    { skip: !schoolId }
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles) {
        setImgValue(acceptedFiles);
      }
    },
    [setImgValue]
  );

  if (isLoading) return <SkeletonProfileTab />;

  if (!data) return <>{translate("messages_no_data")}</>;

  return (
    <>
      <Grid
        container
        alignItems="start"
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ py: 3, px: 3, textAlign: "center" }}>
              <UploadAvatar
                file={
                  imgValue.length > 0 ? URL.createObjectURL(imgValue[0]) : ""
                }
                maxSize={200000}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {translate("general_profile_upload_img", {
                      formats: "png",
                      size: fData(200000),
                    })}
                  </Typography>
                }
              />
            </Card>
            <ProfileUsersInfo
              studentCount={data?.student_count}
              teacherCount={data?.teacher_count}
            />
            <ProfileAbout data={data} />
            <ProfileSocialInfo socialLinks={data?.socials} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          {isLoading ? null : (
            <SchoolProfileForm
              schoolProfile={data}
              schoolId={schoolId}
              file={imgValue[0]}
              setImgValue={setImgValue}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
