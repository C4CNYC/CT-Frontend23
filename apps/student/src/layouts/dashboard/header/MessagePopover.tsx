export default function MessagePopover(): React.ReactElement | null {
  // const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  // const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
  //   setOpenPopover(event.currentTarget);
  // };

  // const handleClosePopover = (): void => {
  //   setOpenPopover(null);
  // };

  return null;

  // return (
  //   <>
  //     <IconButtonAnimate
  //       onClick={handleOpenPopover}
  //       sx={{
  //         p: 0,
  //         ...(openPopover && {
  //           "&:before": {
  //             zIndex: 1,
  //             content: "''",
  //             width: "100%",
  //             height: "100%",
  //             borderRadius: "50%",
  //             position: "absolute",
  //           },
  //         }),
  //       }}
  //     >
  //       <RiMessage2Fill size={20} />
  //     </IconButtonAnimate>

  //     <MenuPopover
  //       open={openPopover}
  //       onClose={handleClosePopover}
  //       sx={{ width: 200, p: 0 }}
  //     >
  //       <Box sx={{ my: 1.5, px: 2.5 }}>
  //         <Typography variant="subtitle2" noWrap>
  //           Hello
  //         </Typography>
  //       </Box>
  //     </MenuPopover>
  //   </>
  // );
}
