import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { format } from "date-fns";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
} from "remirror/extensions";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { Image } from "@components";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";

import { _socials } from "../../../../../nextjs_TS/src/_mock/arrays";

const StyledTitle = styled("h1")(({ theme }) => ({
  ...theme.typography.h3,
  top: 0,
  zIndex: 10,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up("md")]: {
    ...theme.typography.h2,
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(10),
  },
}));

const StyledFooter = styled("div")(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: "100%",
  display: "flex",
  position: "absolute",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    alignItems: "center",
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(10),
  },
}));

interface Props {
  data?: IAssignment;
}

export default function QuestHeader({ data }: Props) {
  const { manager } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
    ],
    stringHandler: "html",
  });
  return (
    <>
      <style>{`.remirror-editor-wrapper { padding: ; }
        .remirror-theme .ProseMirror{
        }
      `}</style>
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          borderRadius: {
            xs: `16px 16px 16px 16px`,
            md: `16px 16px 0 0`,
          },
        }}
      >
        <StyledTitle>{data?.name}</StyledTitle>

        <StyledFooter>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" sx={{ color: "common.white" }}>
                Start date:{" "}
                {data?.start_date
                  ? format(new Date(data?.start_date), "MM/dd/yyyy")
                  : " - "}
              </Typography>

              <Typography variant="body2" sx={{ color: "grey.700" }}>
                Due date:{" "}
                {data?.end_date
                  ? format(new Date(data?.end_date), "MM/dd/yyyy")
                  : " - "}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography variant="subtitle2" sx={{ color: "grey.700", mt: 0.5 }}>
              Tags:
            </Typography>
            <Box
              sx={{
                ml: 1,
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "200px",
                gap: 0.5,
              }}
            >
              {data?.skills ? (
                data.skills.map((el) => (
                  <Chip label={el.name} color="primary" />
                ))
              ) : (
                <Chip label="Programming" color="primary" />
              )}
            </Box>
          </Box>
        </StyledFooter>
        <Image
          alt="cover"
          src={"/assets/background/overlay_2.jpg"}
          ratio="16/9"
        />
      </Box>
      <Box sx={{ px: 2, pb: 3, pt: 2 }}>
        <div className="remirror-theme">
          <Remirror
            manager={manager}
            editable={false}
            initialContent={
              data?.description ? JSON.parse(data?.description) : ""
            }
          >
            <EditorComponent />
          </Remirror>
        </div>
      </Box>
    </>
  );
}
