// next
import NextLink from "next/link";

// @mui
import { Box, Link } from "@mui/material";

//
import { BreadcrumbsLinkProps } from "./types";

// ----------------------------------------------------------------------

interface Props {
  link: BreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
}

export function LinkItem({
  link,
  activeLast,
  disabled,
}: Props): React.ReactElement | null {
   const { name, href, icon, onClick } = link;

  const styles = {
    display: "inline-flex",
    alignItems: "center",
    color: "text.primary",
    cursor: onClick ? "pointer" : "default",
    ...(disabled &&
      !activeLast && {
        cursor: "default",
        pointerEvents: "none",
        color: "text.disabled",
      }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: "inherit",
            "& svg": { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  if (href) {
    return (
      <Link component={NextLink} href={href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box onClick={onClick ?? (() => {})} sx={styles}> {renderContent} </Box>;
}
