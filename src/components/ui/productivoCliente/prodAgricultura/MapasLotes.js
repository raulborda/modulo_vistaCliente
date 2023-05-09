/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { GlobalContext } from "../../../context/GlobalContext";

const styles = {
  width: "100%",
  height: "73%",
  position: "absolute",
};

const MapasLotes = () => {
  const { infoLotes, setInfoLotes, idCliente, setIdCliente, isTableUpdated, setIsTableUpdated } =
    useContext(GlobalContext);

  const URL = process.env.REACT_APP_URL;

  const [geoJSON, setGeoJSON] = useState([]);
  const [dataGeoJSON, setDataGeoJSON] = useState([]);

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZ29uemFsb2I5OCIsImEiOiJjazZtM2V2eHowbHJ2M2xwdTRjMXBncDJjIn0.C0dqUfziJu3E1o8lFxmfqQ";
  const [map, setMap] = useState(null);
  const [puntoCentral, setPuntoCentral] = useState();
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [-63.155242483321686, -37.713092566214875],
        zoom: 1,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
        //* instancia herramientas
        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            point: true,
            trash: true,
          },
        });
        map.addControl(draw);

        // map.addControl(new mapboxgl.NavigationControl(), 'top-left');

        //!
        if (geoJSON !== "") {
          var random = 0;

          for (let i = 0; i < geoJSON.length; i++) {
            var item = 0;

            for (let j = 0; j < geoJSON[i].length; j++) {
              random = random + 1;
              item = j + random;

              const lote = geoJSON[i][j];
              map.addSource(`lote-${item}`, {
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
                id: `lote-layer-${item}`,
                type: "line",
                source: `lote-${item}`,
                paint: {
                  "line-color": "rgba(255,212,2,1)",
                  "line-opacity": 0.8,
                },
              });

              map.addLayer({
                id: `lote-fill-${item}`,
                type: "fill",
                source: `lote-${item}`,
                paint: {
                  "fill-color": "rgba(255,212,2,0.6)",
                },
              });
            }
          }
        }
      });
      //!

      //! INICIO - CENTRAR MAPBOX
      var random = 0;
      var loteL = [];
      var lotesT = [];
      for (let i = 0; i < geoJSON.length; i++) {
        var item = 0;
        for (let j = 0; j < geoJSON[i].length; j++) {
          random = random + 1;
          item = j + random;
          loteL = geoJSON[i][j];
        }
        lotesT.push(loteL);
      }

      if (lotesT.length > 0 && lotesT[0].length > 0) {
        var maxX = lotesT[0][0];
        var minX = lotesT[0][0];
        var maxY = lotesT[0][1];
        var minY = lotesT[0][1];

        for (let i = 0; i < lotesT.length; i++) {
          const coord = lotesT[i];

          if (coord[0] > maxX) {
            maxX = coord[0];
          } else if (coord[0] < minX) {
            minX = coord[0];
          }

          if (coord[1] > maxY) {
            maxY = coord[1];
          } else if (coord[1] < minY) {
            minY = coord[1];
          }
        }
        var bounds = [
          [maxX, maxY],
          [minX, minY],
        ];

        //* centrado de viewport con turf
        var geojsonBounds = turf.bbox({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: [bounds[0]],
                type: "Polygon",
              },
            },
            {
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: [bounds[1]],
                type: "Polygon",
              },
            },
          ],
        });
        map.fitBounds(geojsonBounds, { padding: 10, zoom: 10.3 });
      }
      //! FIN - CENTRAR MAPBOX

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
        console.log("coordenadas a subir a db: ", formattedCoordinates);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  });

  // const idC = localStorage.getItem("cliente");
  //const idC = 2049;
  //const [idCliente, setIdCliente]=useState('2049');

  function infoGeoJSON(idCliente) {

    const data = new FormData();
    data.append("idC", idCliente);
    fetch(`${URL}info_geojson.php`, {
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
        // console.log('coordLotes: ', coordLotes);
      }
      result.push([coordLotes]);
      coordLotes = [];
    }
    setGeoJSON(result);
  }

  useEffect(() => {
    if (dataGeoJSON.length > 0) {
      desarmarGeoJSON();
      console.log("GeoJSON: ", geoJSON);
    }
  }, [dataGeoJSON]);

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
        fetch(`${URL}cliente_lotes.php`, {
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


  //   console.log("infoLotes:", infoLotes);
  //   console.log("cliente: ", idCliente);

  return (
    <>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </>
  );
};

export default MapasLotes;
