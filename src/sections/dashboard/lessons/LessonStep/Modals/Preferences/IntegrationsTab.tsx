import Link from "next/link";
import * as React from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useSnackbar } from "notistack";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Chip,
  Skeleton,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

import { Iconify, SearchNotFound } from "@components";
import { useFilters } from "@hooks";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { BaseResponseInterface, voidFunction } from "@utils";
import { IIntegration } from "src/redux/services/interfaces/integration.interface";
import { useGetIntegrationsListQuery } from "src/redux/services/manager/integration-manager";
import {
  useAddIntegrationMutation,
  useGetLessonIntegrationsQuery,
  useRemoveIntegrationMutation,
} from "src/redux/services/manager/lessons-manager";
import { useTranslate } from "src/utils/translateHelper";

export function IntegrationsTab({
  contentId,
}: {
  contentId: string;
}): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const { filters, setFilter } = useFilters({ name: "", take: 50 });
  const translate = useTranslate();
  const [addIntegration, { isLoading: addLoading }] =
    useAddIntegrationMutation();
  const [removeIntegration, { isLoading: removeLoading }] =
    useRemoveIntegrationMutation();
  const { data, isFetching } = useGetLessonIntegrationsQuery({
    id: contentId,
  });
  const { data: integrations } = useGetIntegrationsListQuery(filters);

  if (!integrations?.data || !data) {
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ width: "100%", height: "56px" }}
      />
    );
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: Array<IIntegration & BaseResponseInterface>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IIntegration & BaseResponseInterface>
  ): Promise<void> => {
    try {
      const payload = {
        lessonId: contentId,
        integration_id: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await addIntegration(payload).unwrap();
          enqueueSnackbar(
            translate("messages_sth_added", {
              name: details?.option.name ?? "",
            })
          );
          return;
        }
        case "removeOption": {
          await removeIntegration(payload).unwrap();
          enqueueSnackbar(
            translate("messages_sth_removed", {
              name: details?.option.name ?? "",
            })
          );
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    } catch {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  if (!integrations.data.length) {
    return (
      <Box>
        <Typography>{translate("integrations_empty")}</Typography>
        <Typography>
          {translate("integrations_lets_create")}{" "}
          <Link href={MANAGER_PATH_DASHBOARD.apps.root}>
            {translate("here")}
          </Link>
        </Typography>
      </Box>
    );
  }

  return (
    <Autocomplete<IIntegration & BaseResponseInterface, true>
      multiple
      loading={isFetching || addLoading || removeLoading}
      value={data}
      onChange={onChange}
      options={integrations?.data}
      popupIcon={null}
      onLoadStart={voidFunction}
      noOptionsText={
        <SearchNotFound sx={{ p: "20px 0" }} query={filters.name} />
      }
      onInputChange={(event, value) => {
        setFilter("name", value);
      }}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            key={option.name}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} placeholder={translate("integrations")} />
      )}
      renderOption={(props, recipient, { inputValue }) => {
        const { name } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = data.find((c) => c.name === name);

        return (
          <Box
            component="li"
            sx={{
              p: "12px !important",
              pointerEvents: selected ? "none" : "auto",
            }}
            {...props}
          >
            <Box
              sx={{
                mr: 1.5,
                width: 32,
                height: 32,
                overflow: "hidden",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  top: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  transition: (theme) =>
                    theme.transitions.create("opacity", {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...{
                    color: "primary.main",
                  },
                }}
              >
                <Iconify
                  icon={
                    selected
                      ? "material-symbols:check-box-outline-rounded"
                      : "material-symbols:check-box-outline-blank"
                  }
                />
              </Box>
            </Box>

            {parts.map((part, index) => (
              <Typography
                key={index}
                variant="subtitle2"
                color={part.highlight ? "primary" : "textPrimary"}
              >
                {part.text}
              </Typography>
            ))}
          </Box>
        );
      }}
    />
  );
}
