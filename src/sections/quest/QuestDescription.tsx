import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
} from "remirror/extensions";

import { Box } from "@mui/material";
import { useTheme } from "@mui/system";

interface Props {
  description: string;
}

export default function QuestDescription({ description }: Props) {
  const { manager } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
    ],
    stringHandler: "html",
  });
  const theme = useTheme();

  return (
    <>
      <style>{`.remirror-editor-wrapper { padding: ; }
        .remirror-theme .ProseMirror{
          background-color: ${theme.palette.background.default};
        }
        .ProseMirror:focus {
          outline: none!important;
      }
      .ProseMirror-focused {
        outline: none!important;
      }
      `}</style>

      <Box sx={{ pb: 3, pt: 2 }}>
        <div className="remirror-theme">
          <Remirror
            manager={manager}
            editable={false}
            initialContent={description ? JSON.parse(description).doc : ""}
          >
            <EditorComponent />
          </Remirror>
        </div>
      </Box>
    </>
  );
}
