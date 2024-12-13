import { Stack, Skeleton, Box, Typography } from "@mui/material";

export function LesonListItemLoading() {
    return (
    <Box position="relative" display="inline-block" width="100%" height="84px">
      <Typography
        variant="body2"
        position="absolute"
                width="100%"
                padding="30px"
                
        textAlign="center"
                color="textSecondary"
                zIndex={111}
      >
        More slides are coming
      </Typography>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box> 

    )
}