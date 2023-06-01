import { Slider } from "@mui/material";
import { Box } from "@mui/system";
import { ReactSketchCanvasProps } from "react-sketch-canvas";

interface InputFieldProps {
  fieldName: keyof ReactSketchCanvasProps;
  type?: string;
  canvasProps: Partial<ReactSketchCanvasProps>;
  setCanvasProps: React.Dispatch<
    React.SetStateAction<Partial<ReactSketchCanvasProps>>
  >;
}

export default function InputField({
  fieldName,
  type = "number",
  canvasProps,
  setCanvasProps,
}: InputFieldProps) {
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setCanvasProps((prevCanvasProps: Partial<ReactSketchCanvasProps>) => ({
      ...prevCanvasProps,
      [fieldName]: target.value,
    }));
  };
  const id = `validation${fieldName}`;

  return (
    <Box p={2}>
      <label htmlFor={id}>{fieldName}</label>
      <Slider
        name={fieldName}
        type={type}
        id={id}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        value={canvasProps[fieldName] as string}
        onChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          handleChange(e);
        }}
        min={1}
        max={30}
        defaultValue={4}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
