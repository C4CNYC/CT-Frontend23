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
import _ from "lodash";
import Link from "next/link";

interface Props {
  type: "lesson" | "course" | "module";
  image: string;
}

export default function CardModule({ type, image }: Props): React.ReactElement {
  return (
    <>
      <Container maxWidth={false}>
        <Card
          sx={{
            minWidth: "328px",
            height: "250px",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid rgba(145, 158, 171, 0.24) ",
            boxShadow: "none",
          }}
        >
          <Stack display="flex" flexDirection="row">
            <Stack>
              <Typography fontSize="22px" mb="16px" fontWeight="600">
                {_.capitalize(type)}
              </Typography>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
                component={Link}
                href="/"
              >
                <MdAddCircleOutline />
                <Typography color="#637381" fontSize="14px">
                  Add New
                </Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <MdEdit />
                <Typography color="#637381" fontSize="14px">
                  Edit Existing
                </Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <FcInfo />
                <Typography color="#637381" fontSize="14px">
                  What’s a module?
                </Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <VisibilityIcon fontSize="small" />
                <Typography color="#637381" fontSize="14px">
                  Watch a tutorial
                </Typography>
              </Stack>
              <Stack
                display="flex"
                direction="row"
                gap="8px"
                alignItems="center"
                mb="9px"
              >
                <CgMenuMotion />
                <Typography color="#637381" fontSize="14px">
                  See all
                </Typography>
              </Stack>
            </Stack>
            <Stack mt="68px" ml="34px">
              <Image
                src={image}
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
