import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { CgArrowUpO } from "react-icons/cg";
import { HiOutlineLightBulb } from "react-icons/hi2";

import {
  FormControl,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useFilters } from "@hooks";
import ProgressTable from "@sections/dashboard/progress/progressTable/ProgressTable";
import { SkeletonProgressTable } from "@sections/dashboard/progress/progressTable/SkeletonProgressTable";
import { useTranslate } from "src/utils/translateHelper";

import { useAuthContext } from "../../../../auth/useAuthContext";
import {
  IClassProgressCourse,
  IClassProgressModule,
} from "../../../../redux/interfaces/class.interface";
import { useGetClassProgressQuery } from "../../../../redux/services/manager/classes-student";

interface IProgressCardProps {
  activeTab: boolean;
}

export default function ProgressCard({
  activeTab,
}: IProgressCardProps): React.ReactElement {
  const { query } = useRouter();
  const { user: loggedUser } = useAuthContext();

  const { filters, setFilter } = useFilters({
    courseId: "",
    moduleId: "",
    lessonId: "",
  });

  const [showTip, setShowTip] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(`progress-table-tip`) !== "true";
    }
    return true;
  });
  const hideTip = () => {
    setShowTip(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`progress-table-tip`, "true");
    }
  };

  useEffect(() => {
    setFilter(["courseId", "moduleId", "lessonId"], "");
  }, [query.id]);

  const [viewBy, setViewBy] = useState<{
    main: "course" | "quest";
    user: "username" | "name";
  }>({
    main: "course",
    user: "name",
  });

  const { data: progressData, isLoading } = useGetClassProgressQuery(
    {
      id: query.id as string,
    },
    {
      skip: !query.id || !activeTab,
    }
  );
  const filteredData =
    loggedUser?.role !== "student"
      ? progressData
      : progressData?.filter((c) => c.id === loggedUser?.student_profile.id);
  const translate = useTranslate();
  const [activeData, setActiveData] = useState<
    IClassProgressCourse[] | IClassProgressModule[]
  >([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  useEffect(() => {
    const selectedData = filters.moduleId.length
      ? filteredData?.[0].courses.find((c) => c.id === filters.courseId)!
          .modules
      : filteredData?.[0].courses;
    setActiveData(selectedData!);
    if (filters.moduleId.length)
      setSelectedIdx(
        selectedData!.findIndex((m) => m.id === filters.moduleId) ?? 0
      );
    else if (filters.courseId.length)
      setSelectedIdx(
        selectedData!.findIndex((c) => c.id === filters.courseId) ?? 0
      );
  }, [filters, filteredData]);

  const levelName = useMemo(
    () =>
      filters.moduleId ? "lesson" : filters.courseId ? "module" : "course",
    [filters.moduleId, filters.courseId]
  );

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        mb={3}
        sx={{
          flexWrap: { xs: "wrap", sm: "wrap" },
          gap: 3,
          "& .MuiStack-root, & .MuiAutocomplete-root": {
            width: {
              xs: "100% !important",
              sm: "260px !important",
              md: "260px !important",
              lg: "260px !important",
            },
          },
        }}
      >
        {levelName !== "course" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!filters.courseId.length && !filters.moduleId.length)
                  return;
                else if (filters.moduleId.length)
                  setFilter(["moduleId", "lessonId"], "");
                else if (filters.courseId.length)
                  setFilter(["courseId", "lessonId"], "");
              }}
            >
              <CgArrowUpO size={28} color="#EE467A" />
            </div>
            <FormControl>
              <TextField
                select
                fullWidth
                sx={{ width: 250 }}
                SelectProps={{
                  native: true,
                  sx: { textTransform: "capitalize" },
                }}
                value={
                  filters.moduleId.length ? filters.moduleId : filters.courseId
                }
                onChange={(e) => {
                  setFilter(
                    filters.moduleId.length ? "moduleId" : "courseId",
                    e.target.value
                  );
                }}
              >
                {activeData.map((module, idx) => (
                  <option key={`${module.id}-${idx}`} value={module.id}>
                    {filters.moduleId.length
                      ? translate("module")
                      : translate("course")}{" "}
                    | {module.name}
                  </option>
                ))}
              </TextField>
            </FormControl>
            <ToggleButtonGroup
              size="small"
              value={""}
              exclusive
              onChange={(_, value) => {
                if (value === "previous") {
                  console.log(selectedIdx, activeData);
                  setFilter(
                    filters.moduleId.length ? "moduleId" : "courseId",
                    activeData[selectedIdx - 1].id
                  );
                } else {
                  setFilter(
                    filters.moduleId.length ? "moduleId" : "courseId",
                    activeData[selectedIdx + 1].id
                  );
                }
              }}
            >
              <ToggleButton value="previous" disabled={selectedIdx === 0}>
                {translate("actions_previous")}
              </ToggleButton>
              <ToggleButton
                value="next"
                disabled={selectedIdx + 1 === activeData.length}
              >
                {translate("next")}
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        )}
        <ToggleButtonGroup
          size="small"
          value={viewBy.user}
          exclusive
          onChange={(_, value) => {
            setViewBy({ ...viewBy, user: value });
          }}
          aria-label="view by username or name"
        >
          <ToggleButton value="username" aria-label="Username">
            {translate("username")}
          </ToggleButton>
          <ToggleButton value="name" aria-label="Name">
            {translate("name")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {isLoading ? (
        <SkeletonProgressTable />
      ) : (
        <>
          {showTip && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 10,
                backgroundColor: "rgba(238, 70, 122, 0.2)",
                color: "#EE467A",
                alignItems: "center",
                paddingLeft: 10,
                fontWeight: 700,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <HiOutlineLightBulb size="10" color="#EE467A" />
                <span>{translate("progress_tooltip_info")}</span>
              </div>
              <div
                style={{ paddingRight: 10, cursor: "pointer" }}
                onClick={() => hideTip()}
              >
                X
              </div>
            </div>
          )}
          <ProgressTable
            filters={filters}
            setFilter={setFilter}
            data={filteredData!}
            viewBy={viewBy}
            levelName={levelName}
          />
        </>
      )}
    </>
  );
}
