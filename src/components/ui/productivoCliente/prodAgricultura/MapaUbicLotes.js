/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { GlobalContext } from "../../../context/GlobalContext";

const styles = {
    width: "99%",
    height: "78%",
    position: "absolute",
};

const MapaUbicLotes = () => {
    console.log("ENTRE A MAPA UBICACION")
    const {
        infoLotes,
        setInfoLotes,
        idCliente,
        setIdCliente,
        isTableUpdated,
        setIsTableUpdated,
        showFormAgregar,
        valorGeoJSON,
        setValorGeoJSON,
        marcarLote, 
        setMarcarLote,
        showMapaUbicLote, 
        setShowMapaUbicLote,
        geoJSONModificado, 
        setGeoJSONModificado,
        tipoMapa,
        ubicLote, setUbicLote,
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
                center: [-63.155242483321686, -37.713092566214875],
                zoom: 1,
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
                //* instancia herramientas
                // if (showFormAgregar) {
                const draw = new MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                        polygon: false,
                        point: false,
                        trash: false,
                    },
                });
                map.addControl(draw);
                // }

                //*

                if (marcarLote !== "" && tipoMapa === 2) {

                    const lote = JSON.parse(marcarLote);
                    console.log('LOTE: ', lote);
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
                    console.log('LOTE - 1: ', lote);
                    map.addLayer({
                        id: `lote-layerU`,
                        type: "line",
                        source: `loteU`,
                        paint: {
                            "line-color": "#65c82e",
                            "line-opacity": 0.8,
                        },
                    });

                    map.addLayer({
                        id: `lote-fillU`,
                        type: "fill",
                        source: `loteU`,
                        paint: {
                            "fill-color": "#65c82e",
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
                console.log("coordenadas a subir a db: ", formattedCoordinates);
                setValorGeoJSON(formattedCoordinates);
            });
            // console.log("ValorGeoJSON: ", valorGeoJSON);
        };

        if (!map) initializeMap({ setMap, mapContainer });
    },[ubicLote]);


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

        // Filtra el GeoJSON solo si marcarLote está definido y tiene la propiedad geojson
        if (marcarLote && marcarLote != null) {
            console.log("entro al if de desarme de maps")
            console.log(marcarLote)
            const coordinatesString = marcarLote;
            const coordinatesJSON = JSON.parse(coordinatesString);

            setGeoJSON(coordinatesJSON ? coordinatesJSON : result);
        } else {
            setGeoJSON(result);
        }
        //setGeoJSON(result);
    }

    useEffect(() => {
        if (dataGeoJSON.length > 0) {
            desarmarGeoJSON();
            console.log("GeoJSON: ", geoJSON);
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

export default MapaUbicLotes;