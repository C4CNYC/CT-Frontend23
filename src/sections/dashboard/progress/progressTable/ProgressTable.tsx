import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { format } from "date-fns";
import _ from "lodash";
import { HiOutlineLightBulb, HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuPencil } from "react-icons/lu";
import {
  MdOutlineAutoMode,
  MdOutlineHome,
  MdOutlineQuiz,
} from "react-icons/md";
import { TbPuzzle } from "react-icons/tb";

import {
  Checkbox,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";

import { TablePaginationCustom } from "@components";
import { SetFilterType } from "@hooks";
import { BaseSearchInterface } from "@utils";
import {
  IClassProgress,
  IClassProgressCourse,
  IClassProgressLesson,
  IClassProgressModule,
} from "src/redux/interfaces/class.interface";
import { RootState, useSelector } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

interface IProgressTable {
  filters: BaseSearchInterface & {
    courseId: string;
    moduleId: string;
    lessonId: string;
  };
  setFilter: SetFilterType;
  data: IClassProgress[];
  viewBy: {
    main: "course" | "quest";
    user: "username" | "name";
  };
  levelName: "lesson" | "module" | "course";
}

type DataType =
  | IClassProgressCourse[]
  | IClassProgressModule[]
  | IClassProgressLesson[];

const defaultIconProps = {
  size: 14,
  style: {
    marginLeft: 2,
  },
};

const AutoGradedIcon = () => (
  <MdOutlineAutoMode color="#75CF6D" {...defaultIconProps} />
);
const ManualGradedIcon = () => (
  <LuPencil color="#5b8aee" {...defaultIconProps} />
);
const CoreCurriculumIcon = () => (
  <MdOutlineHome color="#0198ED" {...defaultIconProps} />
);
const SchoolCurriculumIcon = () => (
  <HiOutlineSquares2X2 color="green" {...defaultIconProps} />
);

export default function ProgressTable({
  data,
  filters,
  setFilter,
  viewBy,
  levelName,
}: IProgressTable): React.ReactElement {
  const translate = useTranslate();

  const lastNameOnly = useSelector(
    (state: RootState) => state.schoolSettings.last_name_only
  );

  const [orderedData, setOrderedData] = useState(data ?? []);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number>(0);
  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number>(0);
  const courses = useMemo(
    () => _.uniqBy(orderedData?.[0]?.courses, "id"),
    [orderedData]
  );
  const [selectedData, setSelectedData] = useState<DataType>([]);
  const [orderBy, setOrderBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setOrderedData(data ?? []);
  }, [data]);

  useEffect(() => {
    const { courseId, moduleId } = filters;
    if (!courses.length) return;
    if (courseId.length)
      setSelectedCourseIdx(
        courses.findIndex((course) => course.id === courseId)!
      );
    if (courseId.length && moduleId.length)
      setSelectedModuleIdx(
        courses
          .find((course) => course.id === courseId)!
          .modules.findIndex((module) => module.id === moduleId)
      );
    if (!courseId.length && !moduleId.length) setSelectedData(courses);
    else if (courseId.length && !moduleId.length)
      setSelectedData(
        courses.find((course) => course.id === courseId)!.modules
      );
    else
      setSelectedData(
        courses
          .find((course) => course.id === courseId)!
          .modules.find((module) => module.id === moduleId)!.lessons
      );
  }, [filters, courses]);

  useEffect(() => {
    const newData = _.cloneDeep(data);
    newData?.sort((a, b) => {
      // @ts-ignore
      const valueA = _.at(a, orderBy);
      // @ts-ignore
      const valueB = _.at(b, orderBy);
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setOrderedData(newData);
  }, [orderBy, sortDirection, data]);

  const onSelectGroup = (id: string) => {
    if (!filters.courseId.length) setFilter("courseId", id);
    else if (!filters.moduleId.length) setFilter("moduleId", id);
    else if (filters.lessonId === id) setFilter("lessonId", "");
    else setFilter("lessonId", id);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {viewBy.user === "name" && (
                <>
                  <TableHeadSort
                    id="first_name"
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                  >
                    {translate("first_name")}
                  </TableHeadSort>
                  <TableHeadSort
                    id="last_name"
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                  >
                    {translate("last_name")}
                  </TableHeadSort>
                </>
              )}
              {viewBy.user === "username" && (
                <TableHeadSort
                  id="username"
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                >
                  {translate("username")}
                </TableHeadSort>
              )}
              {selectedData.map((item, idx) =>
                "description" in item ? (
                  <TableHeadItem
                    id={
                      levelName === "course"
                        ? `courses[${idx}].progress`
                        : `courses[${selectedCourseIdx}].modules[${idx}].progress`
                    }
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    key={item.id}
                    name={item.name}
                    description={
                      <>
                        <Typography variant="body2">
                          {levelName.toUpperCase()} <br />
                          {translate("project")}{" "}
                          {"content_id" in item
                            ? item.content_id
                            : `${courses[selectedCourseIdx]?.content_id}.${
                                idx + 1
                              }`}
                        </Typography>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2">
                          <div
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 6,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item?.description}
                          </div>
                          {"due_date" in item && (
                            <>
                              <br />
                              {translate("due")}:{" "}
                              {format(new Date(item?.due_date), "dd LLL, yyyy")}
                            </>
                          )}
                          <br />
                          {item.autoGraded
                            ? "Auto-graded"
                            : "Manual graded"} |{" "}
                          {item.core ? "Core Curriculum" : "School Curriculum"}
                        </Typography>
                      </>
                    }
                    type={
                      <>
                        {levelName}{" "}
                        {item.autoGraded ? (
                          <AutoGradedIcon />
                        ) : (
                          <ManualGradedIcon />
                        )}{" "}
                        {item.core ? (
                          <CoreCurriculumIcon />
                        ) : (
                          <SchoolCurriculumIcon />
                        )}
                      </>
                    }
                  />
                ) : (
                  <TableHeadLesson
                    id={`courses[${selectedCourseIdx}].modules[${selectedModuleIdx}].lessons[${idx}].progress`}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    collapsed={item.id !== filters.lessonId}
                    type={item.type}
                    name={`${courses[selectedCourseIdx]?.content_id}.${
                      (selectedModuleIdx ?? 0) + 1
                    }.${idx + 1}`}
                    description={item.name}
                  />
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedData
              ?.slice(((filters.page ?? 1) - 1) * 20, (filters.page ?? 0) * 20)
              ?.map((el) => (
                <TableRow>
                  {viewBy.user === "username" && (
                    <TableCell size="small">{el.username}</TableCell>
                  )}
                  {viewBy.user === "name" && (
                    <>
                      <TableCell size="small">{el.first_name}</TableCell>
                      <TableCell size="small">
                        {!lastNameOnly
                          ? `${el.last_name.substring(0, 1)}`
                          : el.last_name}
                      </TableCell>
                    </>
                  )}
                  {(levelName === "course"
                    ? el.courses
                    : levelName === "module"
                    ? el.courses.find((c) => c.id === filters.courseId)!.modules
                    : el.courses
                        .find((c) => c.id === filters.courseId)!
                        .modules.find((m) => m.id === filters.moduleId)!.lessons
                  ).map((item) =>
                    "slides" in item ? (
                      <TableItemLesson
                        key={item.id}
                        collapsed={item.id !== filters.lessonId}
                        progress={item.progress}
                        items={item.slides!.map((slide) => ({
                          name: slide.name,
                          status: slide.progress,
                        }))}
                        onClick={() => onSelectGroup(item.id)}
                      />
                    ) : (
                      <TableItemProgress
                        key={item.id}
                        studentName={`${el.first_name} ${
                          !lastNameOnly
                            ? `${el.last_name.substring(0, 1)}`
                            : el.last_name
                        }`}
                        type={levelName}
                        name={item.name}
                        progress={item.progress}
                        onClick={() => onSelectGroup(item.id)}
                      />
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationCustom
        count={orderedData?.length ?? 0}
        page={filters.page ? filters.page - 1 : 0}
        rowsPerPage={20}
        rowsPerPageOptions={[]}
        onPageChange={(e: any, page: number) => {
          setFilter("page", page + 1);
        }}
      />
    </>
  );
}

const TableHeadSort = ({
  id,
  children,
  sortDirection,
  setSortDirection,
  orderBy,
  setOrderBy,
}: {
  id: string;
  children: ReactNode;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  orderBy: string;
  setOrderBy: (direction: string) => void;
}) => {
  const changeSortDirection = () => {
    const isAsc = orderBy === id && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  return (
    <TableCell size="small" sortDirection={sortDirection}>
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? sortDirection : "asc"}
        onClick={changeSortDirection}
        sx={{
          // @ts-ignore
          textWrap: "nowrap",
        }}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

const TableHeadItem = ({
  name,
  description,
  type,
  sortDirection,
  setSortDirection,
  orderBy,
  setOrderBy,
  id,
}: {
  name: ReactNode;
  description: ReactNode;
  type: ReactNode;
  id: string;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  orderBy: string;
  setOrderBy: (direction: string) => void;
}) => {
  const changeSortDirection = () => {
    const isAsc = orderBy === id && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  return (
    <TableCell
      size="small"
      sx={{ maxWidth: 150 }}
      sortDirection={sortDirection}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? sortDirection : "asc"}
        onClick={changeSortDirection}
        sx={{
          maxWidth: 150,
        }}
      >
        <Tooltip title={description} placement="top">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#212B36",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: 10,
                lineHeight: "4px",
                marginTop: 2,
                textTransform: "uppercase",
              }}
            >
              {type}
            </span>
            <span
              style={{
                // @ts-ignore
                textWrap: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {name}
            </span>
          </div>
        </Tooltip>
      </TableSortLabel>
    </TableCell>
  );
};

const TableHeadLesson = ({
  collapsed = true,
  type,
  name,
  description,
  sortDirection,
  setSortDirection,
  orderBy,
  setOrderBy,
  id,
}: {
  collapsed?: boolean;
  type: string;
  name: string;
  description: string;
  id: string;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  orderBy: string;
  setOrderBy: (direction: string) => void;
}) => {
  const Icon =
    type === "practical"
      ? TbPuzzle
      : type === "exercise"
      ? HiOutlineLightBulb
      : MdOutlineQuiz;
  const IconContainer = () => (
    <div
      style={{
        display: "flex",
        backgroundColor:
          type === "practical"
            ? "#0198ED"
            : type === "exercise"
            ? "#155275"
            : "#FBDD3F",
        color:
          type === "practical"
            ? "#FFF"
            : type === "exercise"
            ? "#FFB960"
            : "#AE5EB7",
        width: 22,
        height: 22,
        lineHeight: 0,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon size="14" style={{ alignSelf: "center" }} />
    </div>
  );
  const changeSortDirection = () => {
    const isAsc = orderBy === id && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  return (
    <TableCell
      size="small"
      sx={
        !collapsed
          ? {
              padding: 0,
              maxWidth: 100,
            }
          : { maxWidth: 100 }
      }
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? sortDirection : "asc"}
        onClick={changeSortDirection}
      >
        <Tooltip
          title={
            <Typography variant="body2">
              {name} - {description}
            </Typography>
          }
          placement="top"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // @ts-ignore
              textWrap: "nowrap",
            }}
          >
            {collapsed ? (
              <div
                style={{
                  // @ts-ignore
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                <IconContainer />
                {name}
              </div>
            ) : (
              <div
                style={{
                  padding: "6px 16px",
                  backgroundColor: "beige",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  // @ts-ignore
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 6,
                  }}
                >
                  <Icon size="14" style={{ alignSelf: "center" }} />
                  <Typography variant="body2">Practical</Typography>
                </div>
                {name} {description}
              </div>
            )}
          </div>
        </Tooltip>
      </TableSortLabel>
    </TableCell>
  );
};

const TableItemProgress = ({
  studentName,
  type,
  name,
  progress,
  hasNextLink = true,
  onClick,
}: {
  studentName: string;
  type: string;
  name: string;
  progress: number;
  hasNextLink?: boolean;
  onClick: () => void;
}) => {
  const translate = useTranslate();

  return (
    <TableCell size="small">
      <Tooltip
        placement="top"
        title={
          <div>
            {translate("student")}: {studentName}
            <br />
            {type}: {name}
            <br />
            {translate("progress")}:{" "}
            {hasNextLink
              ? `${Math.floor(progress)}%`
              : `${progress ? "done" : "not done"}`}
          </div>
        }
      >
        <div onClick={onClick}>
          {hasNextLink ? (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: "16px", width: "100%" }}
            />
          ) : (
            <Checkbox checked={!!progress} />
          )}
        </div>
      </Tooltip>
    </TableCell>
  );
};

const TableItemLesson = ({
  collapsed = true,
  progress,
  items = [],
  onClick,
}: {
  collapsed?: boolean;
  progress: number;
  items: {
    name: string;
    status: "done" | "not done" | "in progress";
  }[];
  onClick: () => void;
}) => {
  return (
    <TableCell
      size="small"
      sx={
        !collapsed
          ? {
              backgroundColor: "beige",
            }
          : {}
      }
    >
      <div onClick={onClick}>
        {collapsed ? (
          <Tooltip
            title={
              <Typography variant="body2">{Math.floor(progress)}%</Typography>
            }
            placement="top"
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: "16px", width: "100%" }}
            />
          </Tooltip>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: 6,
            }}
          >
            {items.map((item) => (
              <Tooltip
                key={`table-lesson-item-${item.name}`}
                title={<Typography variant="body2">{item.name}</Typography>}
                placement="top"
              >
                <LinearProgress
                  variant="determinate"
                  color={item.status === "in progress" ? "warning" : "primary"}
                  value={item.status === "not done" ? 0 : 100}
                  sx={{ height: "16px", width: "16px" }}
                />
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </TableCell>
  );
};
