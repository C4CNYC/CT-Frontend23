import { memo, useCallback, useState } from "react";
import Map from "react-map-gl";
// components
import { MapBoxProps, MapControl } from "@components/map";
//
import ControlPanel from "./ControlPanel";

// ----------------------------------------------------------------------

interface Props extends MapBoxProps {
  themes: Record<string, string>;
}

function MapChangeTheme({
  themes,
  ...other
}: Props): React.ReactElement | null {
  const [selectTheme, setSelectTheme] = useState("outdoors");

  const handleChangeTheme = useCallback((value: string) => {
    setSelectTheme(value);
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 37.785164,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle={themes?.[selectTheme]}
        {...other}
      >
        <MapControl />
      </Map>

      <ControlPanel
        themes={themes}
        selectTheme={selectTheme}
        onChangeTheme={handleChangeTheme}
      />
    </>
  );
}

export default memo(MapChangeTheme);
