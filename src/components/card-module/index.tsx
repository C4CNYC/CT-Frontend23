// mui
import Image from "next/image";
import Link from "next/link";

import _ from "lodash";
import { CgMenuMotion } from "react-icons/cg";
import { FcInfo } from "react-icons/fc";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";

import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { CardTypes } from "src/redux/services/enums/card-types.enum";

interface Props {
  type: CardTypes.lesson | CardTypes.course | CardTypes.module;
  image: string;
}

export function CardModule({ type, image }: Props): React.ReactElement {
  const link =
    type === CardTypes.lesson
      ? MANAGER_PATH_DASHBOARD.lessons.root
      : type === CardTypes.course
      ? MANAGER_PATH_DASHBOARD.courses.root
      : MANAGER_PATH_DASHBOARD.modules.root;
  return (
    <>
      <Card
        sx={(theme) => ({
          minWidth: "328px",
          height: "250px",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid rgba(145, 158, 171, 0.24) ",
          boxShadow: "none",
          [theme.breakpoints.down(400)]: {
            minWidth: "300px",
          },
        })}
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
              href={link}
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
          <Stack
            mt="68px"
            ml="34px"
            sx={(theme) => ({
              [theme.breakpoints.down(400)]: {
                ml: "10px",
              },
            })}
          >
            <Image src={image} alt={""} width="104" height="105" />
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
