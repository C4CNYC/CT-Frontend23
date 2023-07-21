//
import { Image } from "../../image";
//
import { CustomFile } from "../types";

// ----------------------------------------------------------------------

interface Props {
  file: CustomFile | string | null;
}

export function SingleFilePreview({ file }: Props): React.ReactElement | null {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === "string" ? file : file.preview;

  return (
    <Image
      alt="file preview"
      src={imgUrl}
      sx={{
        top: 0,
        left: 0,
        zIndex: 8,
        borderRadius: 1,
        position: "absolute",
        width: "100%",
        height: "87%",
      }}
    />
  );
}
