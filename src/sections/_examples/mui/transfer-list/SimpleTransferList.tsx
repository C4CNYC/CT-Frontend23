import { useState } from "react";
// @mui
import {
  Button,
  Card,
  Checkbox,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// components
import Iconify from "@components/iconify";

// ----------------------------------------------------------------------

function not(a: number[], b: number[]): number[] {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: number[], b: number[]): number[] {
  return a.filter((value) => b.includes(value));
}
export default function SimpleTransferList(): React.ReactElement {
  const [checked, setChecked] = useState<number[]>([]);
  const [left, setLeft] = useState<number[]>([0, 1, 2, 3]);
  const [right, setRight] = useState<number[]>([4, 5, 6, 7]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => (): void => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = (): void => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = (): void => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = (): void => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = (): void => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: number[]): React.ReactElement => (
    <Card
      sx={{
        width: 200,
        height: 220,
        overflow: "auto",
        borderRadius: 1.5,
      }}
    >
      <List dense component="div" role="list">
        {items.map((value: number) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "auto", py: 3 }}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
            sx={{ my: 1 }}
          >
            <Iconify icon="eva:arrowhead-right-fill" width={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
            sx={{ my: 1 }}
          >
            <Iconify icon="eva:arrow-ios-forward-fill" width={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
            sx={{ my: 1 }}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
            sx={{ my: 1 }}
          >
            <Iconify icon="eva:arrowhead-left-fill" width={18} />
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
