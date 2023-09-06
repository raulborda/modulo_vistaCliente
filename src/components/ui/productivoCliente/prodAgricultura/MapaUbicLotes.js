import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { GlobalContext } from "../../../context/GlobalContext";

const styles = {
  width: "100%",
  height: "calc(100% - 175px)",
  position: "absolute",
};

const MapaUbicLotes = () => {
  const {
    setInfoLotes,
    idCliente,
    isTableUpdated,
    setIsTableUpdated,
    setValorGeoJSON,
    marcarLote,
    tipoMapa,
    ubicLote,
  } = useContext(GlobalContext);

  const URL = process.env.REACT_APP_URL;

  const [geoJSON, setGeoJSON] = useState([]);
  const [dataGeoJSON, setDataGeoJSON] = useState([]);
  const [map, setMap] = useState(null);

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZ29uemFsb2I5OCIsImEiOiJjazZtM2V2eHowbHJ2M2xwdTRjMXBncDJjIn0.C0dqUfziJu3E1o8lFxmfqQ";
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [-63.1617707, -35.004224],
        zoom: 5,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
        //* instancia herramientas
        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: false,
            point: false,
            trash: false,
          },
        });
        map.addControl(draw);

        //*
        if (marcarLote !== "" && tipoMapa === 2) {
          const lote = JSON.parse(marcarLote);
          map.addSource(`loteU`, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    coordinates: [lote],
                    type: "Polygon",
                  },
                },
              ],
            },
          });
          map.addLayer({
            id: `lote-layerU`,
            type: "line",
            source: `loteU`,
            paint: {
              "line-color": "#007723",
              "line-width": 3, // Ancho de línea
              "line-opacity": 0.8,
            },
          });

          map.addLayer({
            id: `lote-fillU`,
            type: "fill",
            source: `loteU`,
            paint: {
              "fill-color": "#6aa469",
            },
          });
        }
        //*
      });
      //!

      // //! INICIO - CENTRAR MAPBOX
      //* centrado de viewport con turf
      const lote = JSON.parse(marcarLote);
      var geojsonBounds = turf.bbox({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [lote],
              type: "Polygon",
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [lote],
              type: "Polygon",
            },
          },
        ],
      });
      map.fitBounds(geojsonBounds, { padding: 10, zoom: 15 });
      //   }
      // //! FIN - CENTRAR MAPBOX

      //* geometria dibujada para subir a data base
      map.on("draw.create", (e) => {
        const coordinates = e.features[0].geometry.coordinates[0];
        const formattedCoordinates = JSON.stringify(
          coordinates,
          (key, value) => {
            if (typeof value === "number") {
              return value.toFixed(6);
            }
            return value;
          }
        ).replace(/"/g, "");
        setValorGeoJSON(formattedCoordinates);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [ubicLote, mapContainer, marcarLote, tipoMapa]);

  function infoGeoJSON(idCliente) {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch(`${URL}modulos/info_geojson.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setDataGeoJSON(objetoData);
      });
    });
  }

  var result = [];
  function desarmarGeoJSON() {
    var lengthDG = dataGeoJSON.length;
    var coordLotes = [];
    for (let i = 0; i < lengthDG; i++) {
      const element = dataGeoJSON[i].lot_geojson;
      const parsedData = JSON.parse(element);
      for (let i = 0; i < parsedData.length; i++) {
        const pair = parsedData[i];
        const lon = parseFloat(pair[0]);
        const lat = parseFloat(pair[1]);
        coordLotes.push([lon, lat]);
      }
      result.push([coordLotes]);
      coordLotes = [];
    }

    // Filtra el GeoJSON solo si marcarLote está definido y tiene la propiedad geojson
    if (marcarLote && marcarLote != null) {
      const coordinatesString = marcarLote;
      const coordinatesJSON = JSON.parse(coordinatesString);

      setGeoJSON(coordinatesJSON ? coordinatesJSON : result);
    } else {
      setGeoJSON(result);
    }
  }

  useEffect(() => {
    if (dataGeoJSON.length > 0) {
      desarmarGeoJSON();
    }
  }, [dataGeoJSON, marcarLote]);

  useEffect(() => {
    infoGeoJSON(idCliente);
  }, []);

  //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA Lotes
  useEffect(() => {
    if (isTableUpdated) {
      setIsTableUpdated(false);
      if (idCliente) {
        const data = new FormData();
        data.append("idCli", idCliente);
        fetch(`${URL}modulos/cliente_lotes.php`, {
          method: "POST",
          body: data,
        })
          .then(function (response) {
            response.text().then((resp) => {
              const data = resp;
              const objetoData = JSON.parse(data);
              setInfoLotes(objetoData);
            });
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
      }
    }
  }, [idCliente, isTableUpdated]);

  return (
    <>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </>
  );
};

export default MapaUbicLotes;
