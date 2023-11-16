import { type FC, memo } from "react";

import { Stack, Skeleton, ListItem, ListItemIcon } from "@mui/material";

const SKELETON_ITEMS_COUNT = 4;

const SkeletonItem: FC = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <Skeleton variant="circular" width={30} height={30} />
      </ListItemIcon>
      
      <Stack direction="column" width="100%">
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem', width: "40%" }} />
      </Stack>
    </ListItem>
  )
}

const LoadListSkeleton: FC = () => {
  return (
    <>
      {new Array(SKELETON_ITEMS_COUNT).fill(true).map((_, i) => <SkeletonItem key={i}/>)}
    </>
  )
}

export default memo(LoadListSkeleton);
