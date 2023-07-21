import { useEffect, useState } from "react";

import { add, compareAsc, format, parse, parseISO, toDate } from "date-fns";
import { Control, Controller } from "react-hook-form";
import { TbInfoCircleFilled } from "react-icons/tb";

import { FormGroup, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { RHFAutocomplete, RHFSelect } from "@components";

import { FormValuesProps } from "./AddQuestsModal";

const TECH_OPTIONS = ["css", "html", "js"];

interface Props {
  control: Control<FormValuesProps, any>;
}

export default function SettingsTab({ control }: Props): React.ReactElement {
  const [startDate, setStartDate] = useState<Date | string>(new Date());
  const [dueDate, setDueDate] = useState<Date | string>(
    add(startDate as Date, { days: 1 })
  );
  const [closeDate, setCloseDate] = useState<Date | string>(
    add(dueDate as Date, { days: 3 })
  );

  useEffect(() => {
    setDueDate(add(startDate as Date, { days: 1 }));
  }, [startDate]);

  useEffect(() => {
    setCloseDate(add(dueDate as Date, { days: 3 }));
  }, [dueDate]);
  return (
    <Stack gap={3}>
      <Stack direction="row" gap={4}>
        <FormGroup>
          <Typography variant="h5" gutterBottom>
            Schedule Date:
          </Typography>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <DatePicker
                value={startDate}
                onChange={(event) => {
                  onChange(event as string | React.ChangeEvent<Element>);
                  setStartDate(event as string);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& fieldset": { border: "none" },
                      "& .MuiInputBase-root": {
                        width: "200px",
                        background: "#F7F7FC",
                      },
                      "& .MuiFormHelperText-root": {
                        ml: 0,
                      },
                    }}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          fontStyle: "italic",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <TbInfoCircleFilled color="#D9D9D9" size={22} />
                        Starting date if not date of creation.
                      </Typography>
                    }
                    {...params}
                  />
                )}
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="h5" gutterBottom>
            Due Date:
          </Typography>
          <Controller
            name="dueDate"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <DatePicker
                value={dueDate}
                onChange={(event) => {
                  if (compareAsc(event as Date, startDate as Date) !== 1) {
                    return;
                  }
                  onChange(event as string | React.ChangeEvent<Element>);
                  setDueDate(event as string);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& fieldset": { border: "none" },
                      "& .MuiInputBase-root": {
                        background: "#F7F7FC",
                        width: "200px",
                      },
                      "& .MuiFormHelperText-root": {
                        ml: 0,
                      },
                    }}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          fontStyle: "italic",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <TbInfoCircleFilled color="#D9D9D9" size={22} />
                        This is the date that this Quest should be completed by.
                      </Typography>
                    }
                    {...params}
                  />
                )}
              />
            )}
          />
        </FormGroup>
      </Stack>
      <FormGroup>
        <Typography variant="h5" gutterBottom>
          Close Date:
        </Typography>
        <Controller
          name="closeDate"
          control={control}
          render={({ field: { onChange, value, ...restField } }) => (
            <DatePicker
              value={closeDate}
              onChange={(event) => {
                onChange(event as string | React.ChangeEvent<Element>);
                setCloseDate(event as string);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& fieldset": { border: "none" },
                    "& .MuiInputBase-root": {
                      background: "#F7F7FC",
                      width: "200px",
                    },
                    "& .MuiFormHelperText-root": {
                      ml: 0,
                    },
                  }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        fontStyle: "italic",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <TbInfoCircleFilled color="#D9D9D9" size={22} />
                      After this submissions are no longer received. The default
                      is 3 days after the “Due date.”
                    </Typography>
                  }
                  {...params}
                />
              )}
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <Typography variant="h5" gutterBottom>
          Status
        </Typography>
        <RHFSelect
          native
          name="status"
          size="small"
          sx={{
            maxWidth: "300px",
            background: "#F7F7FC",
            outline: "none",
            borderRadius: 1,
            "& fieldset": { border: "none" },
          }}
        >
          <option key="empty" value="empty"></option>
          <option key="published" value="published">
            Published
          </option>
          <option key="draft" value="draft">
            Draft
          </option>
        </RHFSelect>
      </FormGroup>
      <FormGroup>
        <Typography variant="h5" gutterBottom>
          Tags:
        </Typography>
        <RHFAutocomplete
          name="tags"
          multiple
          freeSolo
          options={TECH_OPTIONS.map((option) => option)}
          ChipProps={{ size: "medium" }}
          sx={{
            "& .MuiAutocomplete-tag": {
              background: "#FBDD3F",
              textTransform: "uppercase",
              fontSize: "1.0rem",
            },
          }}
          helperText={
            <Typography
              variant="caption"
              sx={{
                fontStyle: "italic",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <TbInfoCircleFilled color="#D9D9D9" size={22} />
              This will help others know what the theme is.
            </Typography>
          }
        />
      </FormGroup>
    </Stack>
  );
}
