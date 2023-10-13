import { type FC } from "react";
import {
  Divider,
  List,
  ListItem, 
  Skeleton,
  Stack
} from "@mui/material";

import {
  BASE_STACK_SX,
  LIST_ITEM_SKELETON_SX,
  LIST_ITEM_SX,
  LIST_ITEM_WAVE_SKELETON_SX,
  LIST_SX,
  SKELETON_1_SX,
  SKELETON_2_SX,
  MOCKED_LIST_ITEMS,
  DIVIDER_SX,
  SKELETON_PROPS
} from "./constants";

export const SkeletonDrawer: FC = () => {
  return (
    <Stack>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={BASE_STACK_SX}
        >
          <Skeleton {...SKELETON_PROPS} sx={SKELETON_1_SX} />

          <Skeleton {...SKELETON_PROPS} sx={SKELETON_2_SX} />
        </Stack>

        <List sx={LIST_SX}>
          {MOCKED_LIST_ITEMS.map((_, i) => (
            <ListItem key={i} sx={LIST_ITEM_SX}>
              <Skeleton {...SKELETON_PROPS} sx={LIST_ITEM_SKELETON_SX} />

              <Skeleton {...SKELETON_PROPS} sx={LIST_ITEM_WAVE_SKELETON_SX} />
            </ListItem>
          ))}
        </List>
      </Stack>

      <Divider sx={DIVIDER_SX} />
    </Stack>
  );
};

export default SkeletonDrawer;
