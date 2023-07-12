import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

//
import { StyledMapControls } from "./styles";

// ----------------------------------------------------------------------

interface Props {
  hideScaleControl?: boolean;
  hideGeolocateControl?: boolean;
  hideFullscreenControl?: boolean;
  hideNavigationnControl?: boolean;
}

export function MapControl({
  hideScaleControl,
  hideGeolocateControl,
  hideFullscreenControl,
  hideNavigationnControl,
}: Props): React.ReactElement | null {
  return (
    <>
      <StyledMapControls />

      {!hideGeolocateControl && (
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
        />
      )}

      {!hideFullscreenControl && <FullscreenControl position="top-left" />}

      {!hideScaleControl && <ScaleControl position="bottom-left" />}

      {!hideNavigationnControl && <NavigationControl position="bottom-left" />}
    </>
  );
}
