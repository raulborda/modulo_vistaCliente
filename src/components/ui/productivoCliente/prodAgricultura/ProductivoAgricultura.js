/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  EditOutlined,
  PlusOutlined,
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
    showEdit, setShowEdit,
    setDataEdit,
  } = useContext(GlobalContext);
  
  
  const [shouldReloadMap, setShouldReloadMap] = useState(false);


  const toggleTable = () => {
    setShowTable(!showTable);
    setShowFormAgregar(false);
  };

  const abrirFormAgregar = () => {
    setShowFormAgregar(!showFormAgregar);
    setShowTable(false);
    console.log("showFormAgregar: ", showFormAgregar);
   
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
      render: (text, record) => (
        <>
          <PushpinOutlined
            onClick={() => handleUbic(record)}
            style={{ color: "red", marginRight: "5px" }}
          />
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
    setC(true);
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

  //Boton Ubicacion Lote
  const handleUbic = (record) => {
    setShowMapaUbicLote(true);

    console.log("click ubic", record);

    for (let i = 0; i < infoLotes.length; i++) {
      if (record.key === infoLotes[i].alote_id) {
        setMarcarLote(infoLotes[i].lot_geojson);
      }
    }
  };

  useEffect(() => {
    console.log("marcarLote: ", marcarLote);
    console.log("showUbic: ", showMapaUbicLote);
  }, [marcarLote, showMapaUbicLote]);

  

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


 
  //Recarga los mapas
  useEffect(() => {
    // if (showFormAgregar) {
    setShouldReloadMap(true); // Indicar que se debe recargar el componente
    // }
  }, [showFormAgregar, c, showMapaUbicLote]);

  useEffect(() => {
    // if (shouldReloadMap) {
    setShouldReloadMap(false); // Restablecer la variable de estado
    // }
  }, [shouldReloadMap]);

 
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

            {/* <MapasLotes /> */}
            {/* <MapasLotes key={shouldReloadMap ? Date.now() : null}/>  */}
            {!c ? (
              <MapasLotes key={shouldReloadMap ? Date.now() : null} />
            ) : (
              <MapasLotesEditar key={shouldReloadMap ? Date.now() : null} />
            )}

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
             <AgregarLotes/>
            )}

            {showEdit && (
              <EditarLotes/>
            )}
          </div>
        </>
      )}
    </>
  );
};
