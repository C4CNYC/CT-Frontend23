import { type FC, useMemo } from "react"

import {
  Box,
  Skeleton,
  useMediaQuery,
  useTheme,
  SkeletonProps
} from "@mui/material";

import { getSkeletonCodePanelStyles, getTopBarSkeletonStyles } from "./styles"

const SkeletonCodePanel: FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const styles = useMemo(() => getSkeletonCodePanelStyles(isDesktop), [isDesktop])

  return (
    <Box sx={styles.MainBox}>
      <CPTopBarSkeleton />

      <Box
        sx={styles.BoxTop}
      >
        <Skeleton
          sx={styles.SkeletonSimpleVariant}
          {...SKELETON_ROUNDEN_PROPS}
        />
        <Skeleton
          sx={styles.SkeletonMedium}
          {...SKELETON_ROUNDEN_PROPS}
        />
        <Skeleton
          sx={styles.SkeletonSimpleVariant}
          {...SKELETON_ROUNDEN_PROPS}
        />
      </Box>

      <Box sx={styles.BoxBottomMain}>
        <Skeleton
          sx={styles.SkeletonBotton}
          {...SKELETON_RECT_PROPS}
        />

        <Box sx={styles.BoxBottom}>
          <Skeleton
            sx={styles.SkeletonBoxBottom}
            {...SKELETON_ROUNDEN_PROPS}
          />

          <Skeleton
            sx={styles.SkeletonBoxBottomV2}
            {...SKELETON_RECT_PROPS}
          />
        </Box>
      </Box>
    </Box>
  );
}

export const CPTopBarSkeleton = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const styles = useMemo(() => getTopBarSkeletonStyles(isDesktop), [isDesktop])

  return (
    <Box sx={styles.BoxMain}>
      <Skeleton
        sx={styles.SkeletonTop}
        {...SKELETON_ROUNDEN_PROPS}
      />

      <Skeleton
        sx={styles.SkeletonMedium}
        {...SKELETON_RECT_PROPS}
      />

      {isDesktop && (
         <>
         <Skeleton
           sx={styles.DesktopSkeletonTop}
           {...SKELETON_ROUNDEN_PROPS}
         />
         <Skeleton
           sx={styles.DesktopSkeletonBottom}
           {...SKELETON_ROUNDEN_PROPS}
         />
       </>
      )}
    </Box>
  );
};

const SKELETON_ROUNDEN_PROPS: SkeletonProps = {
  variant: "rounded",
  animation: "wave"
}

const SKELETON_RECT_PROPS: SkeletonProps = {
  variant: "rectangular",
  animation: "wave"
}

export default SkeletonCodePanel
