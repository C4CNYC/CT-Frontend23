// mui
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import Container from "@mui/system/Container";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";
import { FcInfo } from "react-icons/fc";
import { CgMenuMotion } from "react-icons/cg";
import Image from "next/image";

type Props = {
  lesson: string;
  course: string;
  module: string;
};

export default function CardModule({ lesson, course, module }: Props) {
  return (
    <>
      <Container maxWidth={false}>
        <Card
          sx={{
            maxWidth: "348px",
            padding: "24px",
          }}
        >
          <Stack display="flex" flexDirection="row">
            <Stack>
              <Typography fontSize="22px" mb="16px">
                Module
              </Typography>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <MdAddCircleOutline />
                <Typography color="#637381">Add New</Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <MdEdit />
                <Typography color="#637381">Edit Existing</Typography>
              </Stack>
              <Typography variant="h6" mb="9px">
                56 so far
              </Typography>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <FcInfo />
                <Typography color="#637381">What’s a module?</Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <VisibilityIcon fontSize="small" />
                <Typography color="#637381">Watch a tutorial</Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <CgMenuMotion />
                <Typography color="#637381">See all</Typography>
              </Stack>
            </Stack>
            <Stack mt="60px" ml="34px">
              <Image
                src="/assets/images/card-image.png"
                alt={""}
                width="104"
                height="105"
              />
            </Stack>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
