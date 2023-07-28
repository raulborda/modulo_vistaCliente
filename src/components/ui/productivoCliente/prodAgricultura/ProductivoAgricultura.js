/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  ArrowLeftOutlined,
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
  Popover,
  Spin,
  Table,
} from "antd";
import { TbPolygon } from 'react-icons/tb';
import { BiImport } from 'react-icons/bi';
import GraficosProdAgricultura from "./graficosProdAgricultura/GraficosProdAgricultura";
import "./index.css";
import CardInsumos from "./cardDatos/CardInsumos.js";
import { GlobalContext } from "../../../context/GlobalContext";
import MapasLotes from "./MapasLotes";
import MapasLotesEditar from "./MapasLotesEditar";
import MapaUbicLotes from "./MapaUbicLotes";
import AgregarLotes from "./AgregarLotes";
import EditarLotes from "./EditarLotes";
import { GraficosEncuestasCultivo } from "./GraficosEncuestasCultivo";

export const ProductivoAgricultura = () => {
  const URL = process.env.REACT_APP_URL;
  
  const {
    //Ver lotes
    visible,
    setVisible,
    infoLotes,
    showFormAgregar,
    setShowFormAgregar,
    setSelectedLote,

    //usuario
    setMarcarLote,
    setShowMapaUbicLote,
    showTable,
    setShowTable,
    tipoMapa,
    setTipoMapa,
    showEdit, setShowEdit,
    setDataEdit,
    ubicLote,
    setUbicLote,
    importarArchivo, setImportarArchivo,
    setAgregarLote,
    coordenadasArchivo,
    setLimpiarStates,
    spinning,
    selectedLote,
    selectedCampoGeojson,
    setCA,
    update,
    idCliente,
  } = useContext(GlobalContext);

  const [shouldReloadMap, setShouldReloadMap] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const toggleTable = () => {
    setShowTable(!showTable);
    setShowFormAgregar(false);
    setShowEdit(!showEdit);
  };

  const abrirFormAgregar = () => {
    setLimpiarStates(true);
    setImportarArchivo(false);
    setFilaSeleccionada(null);
    if (importarArchivo && showFormAgregar) {
      setShowFormAgregar(true);
    } else {
      setShowFormAgregar(!showFormAgregar);
    }
    setShowTable(false);
    setTipoMapa(0);
    setAgregarLote(true);
  };

  const abrirImportarArchivo = () => {
    setLimpiarStates(true);
    setFilaSeleccionada(null);
    if (!importarArchivo && showFormAgregar) {
      setShowFormAgregar(true);
    } else {
      setShowFormAgregar(!showFormAgregar);
    }
    setShowTable(false);
    setTipoMapa(0);
    setAgregarLote(false);
    setImportarArchivo(true);
  };

  const columns = [
    {
      title: "CAMPO",
      dataIndex: "campo",
      key: "campo",
      width: 20,
      align: "center",
    },
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      width: 20,
    },
    {
      title: "HAS",
      dataIndex: "has",
      key: "has",
      align: "center",
      width: 10,
    },
    {
      title: "CONDICIÓN",
      dataIndex: "condicion",
      key: "condicion",
      align: "center",
      width: 20,
    },
    {
      title: "PARTICIPACIÓN",
      dataIndex: "participacion",
      key: "participacion",
      align: "center",
      width: 20,
    },
    {
      title: "...",
      dataIndex: "accion",
      key: "accion",
      align: "center",
      width: 10,
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
    setFilaSeleccionada(null);
    setTipoMapa(1);
    setShowTable(false);
    setShowEdit(true);
    setDataEdit({
      ...record,
      participacion: parseFloat(record.participacion), // Parsea el valor a un número
    });

    for (let i = 0; i < infoLotes.length; i++) {
      if (record.key === infoLotes[i].alote_id) {
        setSelectedLote(infoLotes[i].lot_geojson);
      }
    }
  };

  const handleUbic = (record) => {
    setShowMapaUbicLote(true);
    setUbicLote(!ubicLote);
    var numMap = 2;
    // Verificar si la clave actual es igual a la clave seleccionada actualmente
    if (record.key === filaSeleccionada) {
      setFilaSeleccionada(null); // Deseleccionar la fila actual
      numMap = 0;
    } else {
      setFilaSeleccionada(record.key); // Seleccionar una nueva fila
    }

    for (let i = 0; i < infoLotes.length; i++) {
      if (record.key === infoLotes[i].alote_id) {
        setMarcarLote(infoLotes[i].lot_geojson);
      }
    }

    // Verificar si la clave actual es igual a la clave seleccionada
    if (record.key === filaSeleccionada) {
      numMap = 0;
    }

    setTipoMapa(numMap);
  };


  //Recarga los mapas
  useEffect(() => {
    setShouldReloadMap(true); // Indicar que se debe recargar el componente
  }, [ubicLote, showFormAgregar, coordenadasArchivo, importarArchivo, selectedLote, selectedCampoGeojson]);

  useEffect(() => {
    setShouldReloadMap(false); // Restablecer la variable de estado
  }, [shouldReloadMap]);

  const handleStage = () => {
    switch (tipoMapa) {
      case 0:
        return <MapasLotes key={shouldReloadMap ? Date.now() : null} />;
      case 1:
        return <MapasLotesEditar key={shouldReloadMap ? Date.now() : null} />;
      case 2:
        return <MapaUbicLotes key={shouldReloadMap ? Date.now() : null} />;
      default:
        return <MapasLotes />;
    }
  };


  const [listCosechas, setListCosechas] = useState([])
  const [cosechaA, setCosechaA] = useState('')

  useEffect(() => {
    const data = new FormData();
    fetch(`${URL}com_traerCosechas.php`, {
      method: "POST",
      body: data,
    }).then(async function (response) {
      await response.text().then((resp) => {
        if (resp) {
          const data = resp;
          const objetoData = JSON.parse(data);
          setCosechaA(objetoData[0].acos_desc)
          setCA(objetoData[0].acos_desc);
          setListCosechas(objetoData);
        }
      });
    });
  }, [update, idCliente])

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
                  {listCosechas && cosechaA && <GraficosProdAgricultura listadoCosechas={listCosechas} cosechaActiva={cosechaA} />}
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
                <GraficosEncuestasCultivo />
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
              <h1
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Open Sans, sans-serif",
                  marginLeft: '10px',
                  color: '#444'
                }}
              >
                LOTES
              </h1>
              <Button
                style={{ marginBottom: "5px", marginRight: "5px", borderRadius:"0px" }}
                onClick={() => (
                  setVisible(!visible), setShowTable(true), setShowEdit(false)
                )}
              >
                <ArrowLeftOutlined /> Volver
              </Button>
            </div>
            {
              spinning ?
                (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Spin tip="Loading..." />
                </div>)
                :
                (<div>
                  {handleStage()}
                </div>)
            }
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

              <Popover
                placement="right"
                content={
                  <>
                    <div
                      onClick={() => abrirFormAgregar()}
                      style={{ display: 'inline-block', padding: '5px' }}
                    >
                      <a
                        type="primary"
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                          marginRight: '5px',
                          display: 'inline-block',
                        }}
                      >
                        <div
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'green';
                            e.currentTarget.querySelector('svg').style.fill = 'green';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'black';
                            e.currentTarget.querySelector('svg').style.fill = 'black';
                          }}
                        >
                          <TbPolygon
                            style={{
                              verticalAlign: 'middle',
                              marginRight: '5px',
                              transition: 'fill 0.3s ease',
                            }}
                          />
                          Dibujar Lote
                        </div>
                      </a>
                    </div>
                    <Divider style={{ marginTop: '0px', marginBottom: '0px' }} />
                    <div
                      onClick={() => abrirImportarArchivo()}
                      style={{ display: 'inline-block', padding: '5px' }}
                    >
                      <a
                        type="primary"
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                          marginRight: '5px',
                          display: 'inline-block',
                        }}
                      >
                        <div
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'green';
                            e.currentTarget.querySelector('svg').style.fill = 'green';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'black';
                            e.currentTarget.querySelector('svg').style.fill = 'black';
                          }}
                        >
                          <BiImport
                            style={{
                              verticalAlign: 'middle',
                              marginRight: '5px',
                              transition: 'fill 0.3s ease',
                            }}
                          />
                          Importar archivo
                        </div>
                      </a>
                    </div>
                  </>
                }
                title="Opciones"
              >
                <Button
                  icon={<PlusOutlined />}
                  style={{ marginTop: "5px" }}
                />
              </Popover>
            </div>

            {showTable && (
              <div style={{ width: '50%', position: "absolute", bottom: "60px", left: "10px", paddingBottom: "35px" }}>
                <Card
                  style={{
                    width: "100%",
                    height: "30%",
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
              </div>
            )}

            {showFormAgregar && (
              <div style={{ width: '50%', position: "absolute", bottom: "10px", left: "10px", paddingBottom: "35px" }}>
                <AgregarLotes />
              </div>
            )}

            {showEdit && (
              <div style={{ width: '50%', position: "absolute", bottom: "10px", left: "10px", paddingBottom: "35px" }}>
                <EditarLotes />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
