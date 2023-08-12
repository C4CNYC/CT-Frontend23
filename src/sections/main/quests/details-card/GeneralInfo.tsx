import { Card, Divider, Stack, Typography } from "@mui/material";

interface IGeneralInfoProps {
  students: number;
}

export default function GeneralInfo({ students }: IGeneralInfoProps) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{students}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Student
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">2342</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Quests
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
