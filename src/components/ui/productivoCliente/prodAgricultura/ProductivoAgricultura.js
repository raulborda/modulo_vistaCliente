/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  BarChartOutlined,
  BarsOutlined,
  CaretUpOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover, Table } from "antd";
import GraficosProdAgricultura from "./graficosProdAgricultura/GraficosProdAgricultura";
import "./index.css";
import { GraficosPrueba } from "./GraficosPrueba";
import CardInsumos from "./cardDatos/CardInsumos.js";
import { GlobalContext } from "../../../context/GlobalContext";
import Mapa from "./MapasLotes";
import MapasLotes from "./MapasLotes";

export const ProductivoAgricultura = () => {
  const URL = process.env.REACT_APP_URL;

  const {
    cardSelected,
    setCardSelected,
    idCliente,
    setIdCliente,
    selectedAcosDesc,
    setSelectedAcosDesc,
    cosechaAnterior,
    setCosechaAnterior,

    infoEvo,
    setInfoEvo,
    update,
    dataForChart,
    setDataForChart,

    //Insumos
    infoInsumoTotal,
    setInfoInsumoTotal,
    infoInsumoAgroquimicos,
    setInfoInsumoAgroquimicos,
    infoInsumoSemillas,
    setInfoInsumoSemillas,
    infoInsumoFertilizantes,
    setInfoInsumoFertilizantes,
    isDataInsumoTotal,
    setIsDataInsumoTotal,
    isDataInsumoAgroquimicos,
    setIsDataInsumoAgroquimicos,
    isDataInsumoSemillas,
    setIsDataInsumoSemillas,
    isDataInsumoFertilizantes,
    setIsDataInsumoFertilizantes,

    //ACOPIO
    infoTotal,
    setInfoTotal,
    infoSoja,
    setInfoSoja,
    infoTrigo,
    setInfoTrigo,
    infoMaiz,
    setInfoMaiz,
    infoOtrosGranos,
    setInfoOtrosGranos,
    isDataTotal,
    setIsDataTotal,
    isDataSoja,
    setIsDataSoja,
    isDataTrigo,
    setIsDataTrigo,
    isDataMaiz,
    setIsDataMaiz,
    isDataOtrosGranos,
    setIsDataOtrosGranos,

    //Ver lotes
    visible,
    setVisible,
  } = useContext(GlobalContext);


  const columns = [
    {
      title: "CAMPO",
      dataIndex: "campo",
      key: "campo",
      width:200,
      align:"center",
    },
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      align:"center",
    },
    {
      title: "HAS",
      dataIndex: "has",
      key: "has",
      align:"center",
    },
    {
      title: "PUNTO CENTRAL",
      dataIndex: "puntoCentral",
      key: "puntoCentral",
      align:"center",
    },
    {
      title: "...",
      dataIndex: "accion",
      key: "accion",
      align:"center",
      width:200,
      render: (text, record) => (
        <>
            <Button onClick={() => handleEdit(record.key)}>Editar</Button>
            <Button onClick={() => handleDelete(record.key)}>Eliminar</Button>
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      campo: "Campo 1",
      nombre: "Nombre 1",
      has: 10,
      puntoCentral: "(-34.603722, -58.381592)",
      accion: "",
    },
    {
      key: "2",
      campo: "Campo 2",
      nombre: "Nombre 2",
      has: 20,
      puntoCentral: "(-34.603722, -58.381592)",
      accion: "",
    },
    {
      key: "3",
      campo: "Campo 3",
      nombre: "Nombre 3",
      has: 30,
      puntoCentral: "(-34.603722, -58.381592)",
      accion: "",
    },
    {
        key: "4",
        campo: "Campo 4",
        nombre: "Nombre 4",
        has: 40,
        puntoCentral: "(-34.603722, -58.381592)",
        accion: "",
      },
      {
        key: "5",
        campo: "Campo 5",
        nombre: "Nombre 5",
        has: 50,
        puntoCentral: "(-34.603722, -58.381592)",
        accion: "",
      },
  ];
  

  const handleEdit = (key) => {
    console.log("click edit")
  };
  
  const handleDelete = (key) => {
    console.log("click delete")
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
                  // borderTop: '2px dashed #56D75B',
                  // borderBottom: '2px dashed #56D75B',
                  // borderRight: '2px dashed #56D75B',
                  // borderLeft: '0px dashed #FFFF',
                  // borderTopLeftRadius: '0%',
                  // borderBottomLeftRadius: '0%',
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
                onClick={() => setVisible(!visible)}
              >
                Volver
              </Button>
            </div>

            <MapasLotes />
            <Table style={{marginTop:"21%"}} dataSource={data} columns={columns} pagination={{ pageSize: 3 }}/>
          </div>
        </>
      )}
    </>
  );
};
