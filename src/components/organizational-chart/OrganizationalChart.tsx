import { Tree, TreeNode } from "react-organizational-chart";

// @mui
import { useTheme } from "@mui/material/styles";

// utils
import { flattenArray, voidFunction } from "@utils";

//
import { GroupNode, SimpleNode, StandardNode } from "./node";
import { ListProps, OrganizationalChartProps, SubListProps } from "./types";

// ----------------------------------------------------------------------

export function OrganizationalChart({
  data,
  variant = "simple",
  sx,
  ...other
}: OrganizationalChartProps): React.ReactElement | null {
  const theme = useTheme();

  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={theme.palette.divider}
      label={
        (variant === "simple" && <SimpleNode sx={sx} node={data} />) ||
        (variant === "standard" && (
          <StandardNode
            sx={sx}
            node={data}
            onEdit={voidFunction}
            onDelete={voidFunction}
          />
        )) ||
        (variant === "group" && <GroupNode sx={sx} node={data} />)
      }
      {...other}
    >
      {data.children.map((list) => (
        <List key={list.name} depth={1} data={list} variant={variant} sx={sx} />
      ))}
    </Tree>
  );
}

// ----------------------------------------------------------------------

export function List({
  data,
  depth,
  variant,
  sx,
}: ListProps): React.ReactElement | null {
  const hasChild = data.children && !!data.children;

  return (
    <TreeNode
      label={
        (variant === "simple" && <SimpleNode sx={sx} node={data} />) ||
        (variant === "standard" && (
          <StandardNode
            sx={sx}
            node={data}
            onEdit={voidFunction}
            onDelete={voidFunction}
          />
        )) ||
        (variant === "group" && (
          <GroupNode
            sx={sx}
            node={data}
            depth={depth}
            length={flattenArray(data.children, "children")?.length}
          />
        ))
      }
    >
      {hasChild && (
        <SubList data={data.children} depth={depth} variant={variant} sx={sx} />
      )}
    </TreeNode>
  );
}

// ----------------------------------------------------------------------

function SubList({
  data,
  depth,
  variant,
  sx,
}: SubListProps): React.ReactElement | null {
  return (
    <>
      {data.map((list) => (
        <List
          key={list.name}
          data={list}
          depth={depth + 1}
          variant={variant}
          sx={sx}
        />
      ))}
    </>
  );
}
