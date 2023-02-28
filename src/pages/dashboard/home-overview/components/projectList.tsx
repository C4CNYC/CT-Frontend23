import { Stack } from "@mui/material";
import ProjectItem from "./projectItem";

export default function ProejctList(): React.ReactElement {
  const projectData = [
    {
      name: "Mini-Projects",
      descr: "You'll finish the Mini-Project in 5 minutes and never stop. :)",
      progress: "5%",
      time: 60,
      lessons: 6,
    },
    {
      name: "Mini-Projects",
      descr: "You'll finish the Mini-Project in 5 minutes and never stop. :)",
      progress: "5%",
      time: 60,
      lessons: 6,
    },
    {
      name: "Mini-Projects",
      descr: "You'll finish the Mini-Project in 5 minutes and never stop. :)",
      progress: "5%",
      time: 60,
      lessons: 6,
    },
    {
      name: "Mini-Projects",
      descr: "You'll finish the Mini-Project in 5 minutes and never stop. :)",
      progress: "5%",
      time: 60,
      lessons: 6,
    },
  ];
  return (
    <Stack
      sx={{
        flexDirection: { md: "row" },
        flexWrap: { sm: "wrap" },
        gap: 4,
      }}
    >
      {projectData.map((el, i) => (
        <ProjectItem
          name={el.name}
          descr={el.descr}
          progress={el.progress}
          time={el.time}
          lessons={el.lessons}
          key={el.name + i}
        />
      ))}
    </Stack>
  );
}
