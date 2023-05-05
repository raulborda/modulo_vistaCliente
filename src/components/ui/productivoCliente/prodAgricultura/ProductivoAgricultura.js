/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  BarChartOutlined,
  BarsOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Input, Popover, Select, Table } from "antd";
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

  const [showTable, setShowTable] = useState(false);
  const [showFormAgregar, setShowFormAgregar] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
    setShowFormAgregar(false);
  };

  const abrirFormAgregar = () => {
    setShowFormAgregar(!showFormAgregar);
    setShowTable(false);
  };


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
      width: 100,
    },
    {
      title: "PUNTO CENTRAL",
      dataIndex: "puntoCentral",
      key: "puntoCentral",
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
          <EditOutlined
            onClick={() => handleEdit(record.key)}
            style={{ color: "#56D75B", marginRight: "3px" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record.key)}
            style={{ color: "red" }}
          />
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
    console.log("click edit");
  };

  const handleDelete = (key) => {
    console.log("click delete");
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
              <Button
                icon={<TableOutlined />}
                onClick={() => toggleTable()}
                style={{ marginTop: '10px', marginBottom: '5px' }}
              />
              <Button
                icon={<PlusOutlined />}
                onClick={() => abrirFormAgregar()}
                style={{}}
              />
            </div>

            {showTable && (
              <Card
                style={{
                  width: "70%",
                  height: "40%",
                  marginTop: "16%",
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
              <Card
                style={{
                  width: "70%",
                  height: "40%",
                  marginTop: "16%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <h1 className="titulos" >NUEVO LOTE</h1>
                    <Divider style={{ marginBottom: '10px', marginTop: '0px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ fontSize: '13px', display: 'inline-block', marginBottom: '2px', fontWeight: 'bold' }} >Nombre Lote:</label>
                      <Input
                        placeholder="Ingrese nombre"
                        style={{
                          width: 150,
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ fontSize: '13px', display: 'inline-block', marginBottom: '2px', fontWeight: 'bold' }} >Campo:</label>
                      <Select
                        defaultValue="lucy"
                        style={{
                          width: 150,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: 'jack',
                            label: 'Jack',
                          },
                          {
                            value: 'lucy',
                            label: 'Lucy',
                          },
                          {
                            value: 'Yiminghe',
                            label: 'yiminghe',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </>
      )}
    </>
  );
};
