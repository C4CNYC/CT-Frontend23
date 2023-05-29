import { Box } from "@mui/system";

interface IBaseBlock {
  children: React.ReactElement | React.ReactFragment;
  columns?: 1 | 2;
}

const BaseBlock = ({
  children,
  columns = 1,
}: IBaseBlock): React.ReactElement => {
  return (
    <Box
      flex={`${columns} ${columns} 0px`}
      position="relative"
      height="calc(100vh - 105px)"
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
};

export default BaseBlock;
