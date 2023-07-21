import ReactLightbox, { Plugin } from "yet-another-react-lightbox";
import { useLightboxState } from "yet-another-react-lightbox/core";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// @mui
import { Typography } from "@mui/material";

//
import { Iconify } from "../iconify";
//
import StyledLightbox from "./styles";
import { LightBoxProps } from "./types";

// ----------------------------------------------------------------------

const ICON_SIZE = 24;

export function LightboxComponent({
  slides,
  disabledZoom,
  disabledVideo,
  disabledTotal,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
  onGetCurrentIndex,
  ...other
}: LightBoxProps): React.ReactElement | null {
  const totalItems = slides ? slides.length : 0;

  return (
    <>
      <StyledLightbox />

      <ReactLightbox
        slides={slides}
        animation={{ swipe: 240 }}
        carousel={{ finite: totalItems < 5 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={getPlugins({
          disabledZoom,
          disabledVideo,
          disabledCaptions,
          disabledSlideshow,
          disabledThumbnails,
          disabledFullscreen,
        })}
        on={{
          view: (index: number) => {
            if (onGetCurrentIndex) {
              onGetCurrentIndex(index);
            }
          },
        }}
        toolbar={{
          buttons: [
            <DisplayTotal
              key={0}
              totalItems={totalItems}
              disabledTotal={disabledTotal}
              disabledCaptions={disabledCaptions}
            />,
            "close",
          ],
        }}
        render={{
          iconClose: () => <Iconify width={ICON_SIZE} icon="carbon:close" />,
          iconZoomIn: () => <Iconify width={ICON_SIZE} icon="carbon:zoom-in" />,
          iconZoomOut: () => (
            <Iconify width={ICON_SIZE} icon="carbon:zoom-out" />
          ),
          iconSlideshowPlay: () => (
            <Iconify width={ICON_SIZE} icon="carbon:play" />
          ),
          iconSlideshowPause: () => (
            <Iconify width={ICON_SIZE} icon="carbon:pause" />
          ),
          iconPrev: () => (
            <Iconify width={ICON_SIZE + 8} icon="carbon:chevron-left" />
          ),
          iconNext: () => (
            <Iconify width={ICON_SIZE + 8} icon="carbon:chevron-right" />
          ),
          iconExitFullscreen: () => (
            <Iconify width={ICON_SIZE} icon="carbon:center-to-fit" />
          ),
          iconEnterFullscreen: () => (
            <Iconify width={ICON_SIZE} icon="carbon:fit-to-screen" />
          ),
        }}
        {...other}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function getPlugins({
  disabledZoom,
  disabledVideo,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
}: LightBoxProps): Plugin[] {
  let plugins = [Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom];

  if (disabledThumbnails) {
    plugins = plugins.filter((plugin) => plugin !== Thumbnails);
  }
  if (disabledCaptions) {
    plugins = plugins.filter((plugin) => plugin !== Captions);
  }
  if (disabledFullscreen) {
    plugins = plugins.filter((plugin) => plugin !== Fullscreen);
  }
  if (disabledSlideshow) {
    plugins = plugins.filter((plugin) => plugin !== Slideshow);
  }
  if (disabledZoom) {
    plugins = plugins.filter((plugin) => plugin !== Zoom);
  }
  if (disabledVideo) {
    plugins = plugins.filter((plugin) => plugin !== Video);
  }

  return plugins;
}

// ----------------------------------------------------------------------

interface DisplayTotalProps {
  totalItems: number;
  disabledTotal?: boolean;
  disabledCaptions?: boolean;
}

export function DisplayTotal({
  totalItems,
  disabledTotal,
  disabledCaptions,
}: DisplayTotalProps): React.ReactElement | null {
  const { state } = useLightboxState();

  const { currentIndex } = state;

  if (disabledTotal) {
    return null;
  }

  return (
    <Typography
      className="yarl__button"
      sx={{
        pl: 3,
        left: 0,
        position: "fixed",
        typography: "body2",
        ...(!disabledCaptions && {
          px: "unset",
          minWidth: 64,
          position: "unset",
          textAlign: "center",
        }),
      }}
    >
      <strong> {currentIndex + 1} </strong> / {totalItems}
    </Typography>
  );
}
