import { 
  useState,
  useCallback, 
 } from "react";

import { Stack } from "@mui/material";

import {
  UploadBox,
  MultiFilePreview, 
 } from "@components";

interface Props {
  attachments: string[];
}

export default function AssignmentsDetailsAttachments({
  attachments,
}: Props): React.ReactElement | null {
  const [files, setFiles] = useState<Array<File | string>>(attachments);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string): void => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      <MultiFilePreview
        thumbnail
        files={files}
        onRemove={(file) => {
          handleRemoveFile(file);
        }}
        sx={{ width: 64, height: 64 }}
      />

      <UploadBox onDrop={handleDrop} />
    </Stack>
  );
}
