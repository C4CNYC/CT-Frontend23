import { Typography } from "@mui/material";

interface IBrowserView {
  value: string;
}

const BrowserView = ({ value }: IBrowserView): React.ReactElement => {
  if (!value) {
    return (
      <Typography
        mt="40px"
        textAlign="center"
        textTransform="uppercase"
        color="#c4c4c4"
        variant="h6"
      >
        No preview available <br />
        Time to get coding
      </Typography>
    );
  }

  return (
    <iframe
      style={{
        border: 0,
        width: "100%",
        height: "100%",
      }}
      src={"data:text/html," + encodeURIComponent(value)}
    />
  );
};

export default BrowserView;
