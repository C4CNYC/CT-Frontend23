export const getPageContainerSx = (isMobile: boolean) => ({
  pt: isMobile ? 2 : 10,
  px: isMobile ? 1 : 8,
  background: !isMobile
    ? `linear-gradient(249.57deg, rgba(255, 255, 255, 0.8) 27.55%, 
                              rgba(255, 255, 255, 0.6) 44.53%, 
                              rgba(255, 255, 255, 0.24) 63.57%), 
              top left / contain url(/assets/projects/header_bg.png) no-repeat`
    : "",
});
export const getBreadcrumbsSx = (isMobile: boolean) => ({
  background: "#fff",
  width: "fit-content",
  py: 1,
  px: isMobile ? 2 : 5,
  borderRadius: 4,
});
export const CONTAINER_SX = {
  flex: "1",
};
export const HEADER_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
  background: "#FFEDF2",
  borderRadius: 3,
  px: 5,
  py: 2,
};
export const CHIP_SX = {
  background: "transparent",
  border: "1px solid #919EAB52",
  borderRadius: 1,
};
export const HEADER_IMG_SX = {
  flexShrink: 0,
  width: "250px",
  height: "250px",
  m: "0 auto",
  borderRadius: "25px",
};
export const LESSON_LIST_SX = {
  gap: 4,
  mt: 6,
  background: "#FFEDF2",
  px: 6,
  pb: 10,
  pt: 2,
  borderRadius: 3,
};
