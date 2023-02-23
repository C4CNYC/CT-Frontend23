import { useState } from "react";
// @mui
import { Masonry } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import {
  DesktopTimePicker,
  MobileTimePicker,
  StaticTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
//
import { Block } from "../../Block";

// ----------------------------------------------------------------------

export default function PickerTime(): React.ReactElement {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
      <Block title="Basic">
        <TimePicker
          label="12 hours"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField fullWidth {...params} margin="normal" />
          )}
        />

        <TimePicker
          ampm={false}
          label="24 hours"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField fullWidth {...params} margin="normal" />
          )}
        />
      </Block>

      <Block title="Responsiveness">
        <MobileTimePicker
          orientation="portrait"
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
        />

        <DesktopTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" fullWidth />
          )}
        />

        <TimePicker
          value={value}
          onChange={setValue}
          renderInput={(params) => (
            <TextField {...params} margin="normal" fullWidth />
          )}
        />
      </Block>

      <Block title="Static mode">
        <Stack spacing={3}>
          <StaticTimePicker
            orientation="portrait"
            displayStaticWrapperAs="mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <StaticTimePicker
            ampm
            orientation="landscape"
            openTo="minutes"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </Block>
    </Masonry>
  );
}
