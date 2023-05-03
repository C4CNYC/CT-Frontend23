import Iconify from "@components/iconify";
import SearchNotFound from "@components/search-not-found";
import {
  alpha,
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { PATH_DASHBOARD } from "@routes/paths";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useFilters } from "src/hooks/useFilters";
import { IIntegration } from "src/redux/services/interfaces/integration.interface";
import { useGetIntegrationsQuery } from "src/redux/services/manager/integration-manager";
import {
  useAddIntegrationMutation,
  useGetLessonIntegrationsQuery,
  useRemoveIntegrationMutation,
} from "src/redux/services/manager/lessons-manager";

import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export function IntegrationsTab({
  contentId,
}: {
  contentId: string;
}): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [addIntegration, { isLoading: addLoading }] =
    useAddIntegrationMutation();
  const [removeIntegration, { isLoading: removeLoading }] =
    useRemoveIntegrationMutation();
  const { data: usedIntegration, isFetching } = useGetLessonIntegrationsQuery({
    id: router.query.lessonId as string,
  });
  const { data: integrations } = useGetIntegrationsQuery(filters);

  if (!integrations?.data || !usedIntegration) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: Array<IIntegration & BaseResponseInterface>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IIntegration & BaseResponseInterface>
  ): Promise<void> => {
    try {
      const payload = {
        lessonId: router.query.lessonId as string,
        integration_id: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await addIntegration(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} added`);
          return;
        }
        case "removeOption": {
          await removeIntegration(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} removed`);
          return;
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  if (!integrations.data.length) {
    return (
      <Box>
        <Typography>You don't have any integrations.</Typography>
        <Typography>
          Lest's create integration{" "}
          <Link href={PATH_DASHBOARD.apps.root}>here</Link>
        </Typography>
      </Box>
    );
  }

  return (
    <Autocomplete<IIntegration & BaseResponseInterface, true>
      multiple
      loading={isFetching || addLoading || removeLoading}
      value={usedIntegration}
      onChange={onChange}
      options={integrations?.data}
      popupIcon={null}
      onLoadStart={() => {}}
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
        <TextField {...params} placeholder="Integrations" />
      )}
      renderOption={(props, recipient, { inputValue }) => {
        const { name } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = usedIntegration.find((c) => c.name === name);

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
