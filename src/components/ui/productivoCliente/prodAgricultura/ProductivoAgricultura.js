/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  EditOutlined,
  PlusOutlined,
  PushpinFilled,
  PushpinOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Table,
} from "antd";
import GraficosProdAgricultura from "./graficosProdAgricultura/GraficosProdAgricultura";
import "./index.css";
import { GraficosPrueba } from "./GraficosPrueba";
import CardInsumos from "./cardDatos/CardInsumos.js";
import { GlobalContext } from "../../../context/GlobalContext";
import MapasLotes from "./MapasLotes";
import MapasLotesEditar from "./MapasLotesEditar";
import MapaUbicLotes from "./MapaUbicLotes";
import AgregarLotes from "./AgregarLotes";
import EditarLotes from "./EditarLotes";

export const ProductivoAgricultura = () => {
  //const URL = process.env.REACT_APP_URL;

  const {

    //Ver lotes
    visible,
    setVisible,
    infoLotes,
    showFormAgregar,
    setShowFormAgregar,
    setSelectedLote,

    //usuario
    c,
    setC,
    marcarLote,
    setMarcarLote,
    showMapaUbicLote,
    setShowMapaUbicLote,
    showTable,
    setShowTable,
    tipoMapa,
    setTipoMapa,
    showEdit, setShowEdit,
    setDataEdit,
    ubicLote,
    setUbicLote,
  } = useContext(GlobalContext);


  const [shouldReloadMap, setShouldReloadMap] = useState(false);


  const toggleTable = () => {
    // setFilaSeleccionada(null);
    setShowTable(!showTable);
    setShowFormAgregar(false);
    // setTipoMapa(0)
  };

  const abrirFormAgregar = () => {
    setFilaSeleccionada(null);
    setShowFormAgregar(!showFormAgregar);
    setShowTable(false);
    console.log("showFormAgregar: ", showFormAgregar);
    setTipoMapa(0)
  };

  // console.log("infoLotes:", infoLotes);
  //console.log("cliente: ", idCliente);

  const columns = [
    {
      title: "CAMPO",
      dataIndex: "campo",
      key: "campo",
      width: 100,
      align: "center",
    },
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      width: 100,
    },
    {
      title: "HAS",
      dataIndex: "has",
      key: "has",
      align: "center",
      width: 60,
    },
    {
      title: "CONDICION",
      dataIndex: "condicion",
      key: "condicion",
      align: "center",
      width: 100,
    },
    {
      title: "PARTICIPACION",
      dataIndex: "participacion",
      key: "participacion",
      align: "center",
      width: 100,
    },
    {
      title: "...",
      dataIndex: "accion",
      key: "accion",
      align: "center",
      width: 100,
      // render: (text, record) => (
      //   <>
      //     <PushpinOutlined
      //       onClick={() => handleUbic(record)}
      //       style={{ color: "red", marginRight: "5px" }}
      //     />
      //     <EditOutlined
      //       onClick={() => handleEdit(record)}
      //       style={{ color: "#56D75B" }}
      //     />
      //   </>
      // ),
      render: (text, record) => (
        <>
          {record.key === filaSeleccionada ? (
            <PushpinFilled
              onClick={() => handleUbic(record)}
              style={{ color: "red", marginRight: "5px" }}
            />
          ) : (
            <PushpinOutlined
              onClick={() => handleUbic(record)}
              style={{ color: "red", marginRight: "5px" }}
            />
          )}
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ color: "#56D75B" }}
          />
        </>
      ),
    },
  ];

  const data = infoLotes.map((lote, index) => ({
    key: lote.alote_id,
    campo: lote.cam_nombre,
    nombre: lote.alote_nombre,
    has: lote.ahas_usuario,
    condicion: lote.acondicion === "1" ? "PROPIO" : "ALQUILADO",
    participacion: lote.alxsocio_porc + "%",
  }));

  //Boton Editar Lote
  const handleEdit = (record) => {
    // setC(true);
    setFilaSeleccionada(null);
    setTipoMapa(1);
    //form.resetFields();
    setShowTable(false);
    setShowEdit(true);
    //setDataEdit(record);
    setDataEdit({
      ...record,
      participacion: parseFloat(record.participacion), // Parsea el valor a un número
    });
    //console.log("click edit: ", record);
    //console.log("StateEdit: ", record);

    for (let i = 0; i < infoLotes.length; i++) {
      if (record.key === infoLotes[i].alote_id) {
        //  console.log("key: ", infoLotes[i].alote_id)
        //  console.log("lot_geoJson", infoLotes[i].lot_geojson);
        setSelectedLote(infoLotes[i].lot_geojson);
      }
    }
  };

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const handleUbic = (record) => {
    setShowMapaUbicLote(true);
    setUbicLote(!ubicLote);
    console.log("click ubic", record);
    console.log('infoLotes: ', infoLotes);
  
    // Verificar si la clave actual es igual a la clave seleccionada actualmente
    if (record.key === filaSeleccionada) {
      setFilaSeleccionada(null); // Deseleccionar la fila actual
    } else {
      setFilaSeleccionada(record.key); // Seleccionar una nueva fila
    }
  
    var numMap = 2;
  
    for (let i = 0; i < infoLotes.length; i++) {
      if (record.key === infoLotes[i].alote_id) {
        setMarcarLote(infoLotes[i].lot_geojson);
      }
    }
  
    console.log('record.key: ', record.key);
  
    // Verificar si la clave actual es igual a la clave seleccionada
    if (record.key === filaSeleccionada) {
      numMap = 0;
    }
  
    setTipoMapa(numMap);
  };
  
  






  // const handleUbic = (record) => {
  //   setShowMapaUbicLote(true);
  //   setUbicLote(!ubicLote);
  //   console.log("click ubic", record);
  //   console.log('infoLotes: ', infoLotes);

  //   // Verificar si la clave ya está seleccionada
  //   const index = filaSeleccionada.indexOf(record.key);
  //   if (index > -1) {
  //     // Si la clave está presente, removerla
  //     const nuevaSeleccion = [...filaSeleccionada];
  //     nuevaSeleccion.splice(index, 1);
  //     setFilaSeleccionada(nuevaSeleccion);
  //   } else {
  //     // Si la clave no está presente, agregarla
  //     setFilaSeleccionada([...filaSeleccionada, record.key]);
  //   }

  //   var numMap = 2;

  //   for (let i = 0; i < infoLotes.length; i++) {
  //     if (record.key === infoLotes[i].alote_id) {
  //       setMarcarLote(infoLotes[i].lot_geojson);
  //     }
  //   }

  //   console.log('record.key: ', record.key);

  //   // Verificar si la clave actual está seleccionada
  //   if (filaSeleccionada.includes(record.key)) {
  //     numMap = 0;
  //   }

  //   setTipoMapa(numMap);
  // };






  //Boton Ubicacion Lote
  // const [anteriorLote, setAnteriorLote] = useState(null);
  // const handleUbic = (record) => {
  //   setShowMapaUbicLote(true);
  //   setUbicLote(!ubicLote);
  //   console.log("click ubic", record);
  //   console.log('infoLotes: ', infoLotes);

  //   // Guardar clave de la fila anterior
  //   setAnteriorLote(record.key);

  //   var numMap = 2;

  //   for (let i = 0; i < infoLotes.length; i++) {
  //     if (record.key === infoLotes[i].alote_id) {
  //       setMarcarLote(infoLotes[i].lot_geojson);
  //     }
  //   }

  //   console.log('record.key: ', record.key);

  //   // Comparar clave anterior con clave actual
  //   if (record.key === anteriorLote) {
  //     numMap = 0;

  //   }

  //   setTipoMapa(numMap);
  // };



  // const handleUbic = (record) => {
  //   setShowMapaUbicLote(true);
  //   setUbicLote(!ubicLote);
  //   console.log("click ubic", record);
  //   console.log('infoLotes: ', infoLotes);
  //   var numMap = 2;
  //   // var numMapp = 2;
  //   var numAnteriorLote = 0;
  //   for (let i = 0; i < infoLotes.length; i++) {
  //     if (record.key === infoLotes[i].alote_id) {
  //       setMarcarLote(infoLotes[i].lot_geojson);
  //       numAnteriorLote = infoLotes[i].alote_id;
  //       } 
  //       // else if (record.key === numAnteriorLote) {
  //       //   // setTipoMapa(0)
  //       //   numMap = 0
  //       // }
  //     }
  //     console.log('numAnteriorLote: ', numAnteriorLote);
  //     console.log('record.key: ', record.key);
  //     if (record.key === numAnteriorLote) {
  //       numMap = 0
  //     }
  //     setTipoMapa(numMap)
  //   };
  // useEffect(() => {
  //   setTipoMapa(2)
  // }, [marcarLote, ubicLote])

  useEffect(() => {
    console.log("marcarLote: ", marcarLote);
    console.log("showUbic: ", showMapaUbicLote)
    console.log("ubicLote: ", ubicLote);
  }, [marcarLote, showMapaUbicLote]);



  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };



  //Recarga los mapas
  useEffect(() => {
    // if (showFormAgregar) {
    setShouldReloadMap(true); // Indicar que se debe recargar el componente
    // }
  }, [ubicLote]);
  // }, [showFormAgregar, tipoMapa, showMapaUbicLote]);

  useEffect(() => {
    // if (shouldReloadMap) {
    setShouldReloadMap(false); // Restablecer la variable de estado
    // }
  }, [shouldReloadMap]);

  // useEffect(() => {
  //   setTipoMapa(2)
  // }, [marcarLote])


  const handleStage = () => {
    switch (tipoMapa) {
      case 0:
        return <MapasLotes />;
      case 1:
        return <MapasLotesEditar />;
      case 2:
        return <MapaUbicLotes key={shouldReloadMap ? Date.now() : null} />;
      default:
        return <MapasLotes />;
    }
  };




  return (
    <>
      {visible === false ? (
        <>
          <div className="divContainerAgricultura">
            <div className="divProdAgricultura">
              <div
                className="divProdAgriculturaDatos"
                style={{ paddingRight: "5px" }}
              >
                <CardInsumos />
              </div>
              <Card
                style={{
                  width: "50%",
                }}
              >
                <div className="divContainerGraficos">
                  <GraficosProdAgricultura />
                </div>
              </Card>
            </div>
            <div
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingBottom: "5px",
                backgroundColor: "#FFFF",
              }}
            >
              <Card>
                <GraficosPrueba />
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Lotes</h3>
              <Button
                style={{ marginBottom: "5px" }}
                // eslint-disable-next-line no-sequences
                onClick={() => (
                  setVisible(!visible), setShowTable(false), setShowEdit(false)
                )}
              >
                Volver
              </Button>
            </div>

            {/* {!c ? (
              <MapasLotes key={shouldReloadMap ? Date.now() : null} />
            ) : (
              <MapasLotesEditar key={shouldReloadMap ? Date.now() : null} />
            )} */}

            {handleStage()}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <Button
                style={{ marginTop: "8px" }}
                icon={<TableOutlined />}
                onClick={() => toggleTable()}
              ></Button>
              <Button
                icon={<PlusOutlined />}
                onClick={() => abrirFormAgregar()}
                style={{ marginTop: "5px" }}
              />
            </div>

            {showTable && (
              <Card
                style={{
                  width: "60%",
                  height: "30%",
                  marginTop: "13%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <Table
                  dataSource={data}
                  columns={columns}
                  pagination={{ pageSize: 3 }}
                />
              </Card>
            )}

            {showFormAgregar && (
              <AgregarLotes />
            )}

            {showEdit && (
              <EditarLotes />
            )}
          </div>
        </>
      )}
    </>
  );
};
