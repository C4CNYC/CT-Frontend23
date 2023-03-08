import SaveButton from "@components/editor/SaveButton";
import { useSnackbar } from "@components/snackbar";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { GoBrowser } from "react-icons/go";
import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { useUpdateLessonContentMutation } from "src/redux/services/manager/lesson-content-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import CodeBrowser from "./CodeBrowser";
import CodeContent from "./CodeContent";

type Props = {
  data?: ILessonContent & BaseResponseInterface;
  lessonId: string;
  isLoading: boolean;
};

export default function CodeHeader({
  data,
  lessonId,
  isLoading,
}: Props): React.ReactElement {
  const [currentTab, setCurrentTab] = useState("code");
  const [userCode, setUserCode] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [updateLessonContent] = useUpdateLessonContentMutation();

  useEffect(() => {
    if (data) {
      setUserCode(JSON.parse(data.body)?.body.code);
    }
  }, [data]);

  const saveContent = async (): Promise<void> => {
    const data = JSON.stringify({
      body: {
        code: userCode,
      },
    });

    try {
      await updateLessonContent({
        lessonId,
        type: LessonContentType.Html,
        body: data,
      }).unwrap();
      enqueueSnackbar("Update success");
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
    }
  };

  const TABS = [
    {
      value: "code",
      label: "Code",
      icon: <BsCodeSlash size="20px" />,
      component: (
        <CodeContent
          code={userCode}
          setUserCode={setUserCode}
          isLoading={isLoading}
        />
      ),
    },
    {
      value: "browser",
      label: "browser",
      icon: <GoBrowser size="20px" />,
      component: <CodeBrowser code={userCode} />,
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f4f5f7",
          px: "15px",
        }}
      >
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
          sx={{ "& .MuiTabs-flexContainer": { py: "6px" } }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label as string}
            />
          ))}
        </Tabs>
        {currentTab !== "browser" ? (
          <SaveButton
            onClick={() => saveContent()}
            sx={{
              color: "#7963d2",
              border: "1px solid rgba(121, 99, 210, 0.5)",
              borderRadius: "4px",
              "&:hover": {
                border: "1px solid rgba(121, 99, 210, 0.5)",
                backgroundColor: " rgba(121, 99, 210, 0.1)",
              },
            }}
          />
        ) : null}
      </Box>

      {TABS.map(
        (tab) =>
          tab.value === currentTab && (
            <Box sx={{ height: "80vh" }} key={tab.value}>
              {" "}
              {tab.component}{" "}
            </Box>
          )
      )}
    </>
  );
}
