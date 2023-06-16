import { Avatar, Button, Card, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { RxLinkedinLogo } from "react-icons/rx";

interface Props {
  setEditVisible: (visible: boolean) => void;
}

export default function AuthorsCard({
  setEditVisible,
}: Props): React.ReactElement {
  return (
    <Card sx={{ p: 2 }}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Typography variant="h6" gutterBottom sx={{ maxWidth: "80px" }}>
            Names LongSurname
          </Typography>
          <Stack direction="row" gap={1}>
            <Button
              variant="soft"
              color="success"
              size="small"
              onClick={() => {
                setEditVisible(true);
              }}
            >
              Edit
            </Button>
            <Button variant="contained" color="success" size="small">
              Add to course
            </Button>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Typography variant="body2">
            <Avatar
              sx={{
                float: "left",
                width: "60px",
                height: "60px",
                mr: 1,
              }}
            />
            Abou Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae iusto eaque earum optio quos cum accusamus, at numquam
            perspiciatis ducimus cupiditate recusandae nihil, distinctio
            voluptatibus laudantium rerum, tempora labore doloribus!
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap={2} mt={2}>
          <Typography variant="subtitle2">someEmail@gmail.com</Typography>
          <Link component={NextLink} href="#">
            <RxLinkedinLogo size="25px" color="#0077b5" />
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
