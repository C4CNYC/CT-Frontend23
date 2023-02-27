import { memo, useCallback, useState } from "react";
import Map, { LngLat, MarkerDragEvent } from "react-map-gl";
// components
import { MapBoxProps, MapControl, MapMarker } from "@components/map";
//
import ControlPanel from "./ControlPanel";

// ----------------------------------------------------------------------

function MapDraggableMarkers({ ...other }: MapBoxProps): React.ReactElement {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <>
      <Map
        initialViewState={{ latitude: 40, longitude: -100, zoom: 3.5 }}
        {...other}
      >
        <MapControl />

        <MapMarker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        />
      </Map>

      <ControlPanel events={events} />
    </>
  );
}

export default memo(MapDraggableMarkers);
