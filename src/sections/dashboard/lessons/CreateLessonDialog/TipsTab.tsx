import { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

interface ITipsTabProps {
  tips: string[];
  deleteTip: (tip: string[]) => void;
  isLoading: boolean;
}

export default function TipsTab({
  tips,
  deleteTip,
  isLoading,
}: ITipsTabProps): React.ReactElement {
  const [checked, setChecked] = useState<string[]>([]);
  const translate = useTranslate();

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    if (!isLoading) {
      setChecked([]);
    }
  }, [isLoading]);

  return (
    <>
      <Collapse in={Boolean(checked.length)}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            pr: 1,
            pl: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1">
            {translate("actions_remove_selected")}
          </Typography>
          <LoadingButton
            color="error"
            variant="contained"
            sx={{ p: 0.5, minWidth: 0 }}
            onClick={() => {
              deleteTip(checked);
            }}
            loading={isLoading}
          >
            <DeleteIcon />
          </LoadingButton>
        </Stack>
      </Collapse>
      <List sx={{ maxHeight: "290px", overflowY: "auto" }}>
        {tips.map((tip, i) => (
          <ListItem
            key={tip + i}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(tip)}
                checked={checked.includes(tip)}
              />
            }
          >
            {tip}
          </ListItem>
        ))}
      </List>
    </>
  );
}
