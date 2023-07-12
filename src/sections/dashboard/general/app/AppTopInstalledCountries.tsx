// @mui
import { Card, CardHeader, CardProps, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import { Iconify, Image, Scrollbar } from "@components";
// utils
import { fShortenNumber } from "@utils";

// ----------------------------------------------------------------------

const StyledBlock = styled((props: any) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 72,
  flex: "1 1",
});

const StyledItemIcon = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

interface ItemProps {
  id: string;
  name: string;
  android: number;
  windows: number;
  apple: number;
  flag: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function AppTopInstalledCountries({
  title,
  subheader,
  list,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {list.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface CountryItemProps {
  country: ItemProps;
}

function CountryItem({ country }: CountryItemProps): React.ReactElement | null {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <StyledBlock sx={{ minWidth: 120 }}>
        <Image
          disabledEffect
          alt={country.name}
          src={country.flag}
          sx={{ width: 28, mr: 1 }}
        />
        <Typography variant="subtitle2">{country.name}</Typography>
      </StyledBlock>

      <StyledBlock>
        <StyledItemIcon icon="ant-design:android-filled" />
        <Typography variant="body2">
          {fShortenNumber(country.android)}
        </Typography>
      </StyledBlock>

      <StyledBlock>
        <StyledItemIcon icon="ant-design:windows-filled" />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </StyledBlock>

      <StyledBlock sx={{ minWidth: 88 }}>
        <StyledItemIcon icon="ant-design:apple-filled" />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </StyledBlock>
    </Stack>
  );
}
