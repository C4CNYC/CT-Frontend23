// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box, Card, Avatar, Divider, Typography, Stack } from "@mui/material";
// utils
import { fShortenNumber } from "../../../../utils/formatNumber";
// @types
import { ICourse } from "../../../../@types/courses";
// _mock
import { _socials } from "../../../../_mock/arrays";
// components
import Label from "@components/label";
import Image from "../../../../components/image";
import Iconify from "../../../../components/iconify";
import SvgColor from "../../../../components/svg-color";

// ----------------------------------------------------------------------

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64)
}));

// ----------------------------------------------------------------------

type Props = {
  course: ICourse;
};

export default function UserCard({ course }: Props) {
  const {
    name,
    level,
    price,
    description,
    active,
    cover,
  } = course;

  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative", borderBottom: "1px solid rgba(145, 158, 171, 0.24)" }}>
        <Label
          variant="soft"
          color={active ? "success" : "error"}
          sx={{ textTransform: "uppercase", mr: "auto", position: "absolute", top: 15, right: 15 }}
        >
          {active ? "Active" : "Not Active"}
        </Label>
        <Image src={cover} alt={cover} ratio="16/9" style={{ objectFit: "contain", padding: 10 }} />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: "text.disabled" }}>
            Level
          </Typography>
          <Typography variant="subtitle1">{level}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: "text.disabled" }}>
            Price
          </Typography>

          <Typography variant="subtitle1">{price}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: "text.disabled" }}>
            Total Hours
          </Typography>
          <Typography variant="subtitle1">10H</Typography>
        </div>
      </Box>
    </Card>
  );
}
