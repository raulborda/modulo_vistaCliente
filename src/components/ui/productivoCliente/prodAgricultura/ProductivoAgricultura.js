/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
  Popover,
  Select,
  Table,
} from "antd";
import GraficosProdAgricultura from "./graficosProdAgricultura/GraficosProdAgricultura";
import "./index.css";
import { GraficosPrueba } from "./GraficosPrueba";
import CardInsumos from "./cardDatos/CardInsumos.js";
import { GlobalContext } from "../../../context/GlobalContext";
import Mapa from "./MapasLotes";
import MapasLotes from "./MapasLotes";

export const ProductivoAgricultura = () => {
  const URL = process.env.REACT_APP_URL;
  const [form] = Form.useForm();
  const { Option } = Select;

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
    infoLotes,
    setInfoLotes,
    loteId,
    setLoteId,
    isTableUpdated, 
    setIsTableUpdated,


    //usuario
    usu,

  } = useContext(GlobalContext);

  const [showTable, setShowTable] = useState(false);
  const [showFormAgregar, setShowFormAgregar] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const toggleTable = () => {
    setShowTable(!showTable);
    setShowFormAgregar(false);
  };

  const abrirFormAgregar = () => {
    setShowFormAgregar(!showFormAgregar);
    setShowTable(false);
  };

  console.log("infoLotes:", infoLotes);
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

  const handleEdit = (record) => {
    //form.resetFields();
    setShowTable(false);
    setShowEdit(true);
    //setDataEdit(record);
    setDataEdit({
      ...record,
      participacion: parseFloat(record.participacion), // Parsea el valor a un número
    });
    console.log("click edit: ", record);
    console.log("StateEdit: ", record);
  };

  useEffect(() => {
    if (dataEdit) {
      setLoteId(dataEdit.key);
      form.setFieldsValue({
        campo: dataEdit.campo,
        nombre: dataEdit.nombre,
        has: dataEdit.has,
        condicion: dataEdit.condicion,
        participacion: dataEdit.participacion,
      });
    }
  }, [dataEdit]);

  const handleUbic = (data) => {
    console.log("click delete", data);
  };


  const onSubmit = (values) => {
      // console.log("Formulario enviado con valores:", values);
    // console.log("clienteEdit", idCliente);
    //console.log("loteId", loteId);

    const dataE = new FormData();
    dataE.append("usu",  usu);
    dataE.append("idC", idCliente);
    dataE.append("idLote", loteId);
    dataE.append("lote", values.nombre);
    dataE.append("has", values.has);
    dataE.append("condicion", values.condicion);
    dataE.append("participacion", values.participacion);

    console.log("onSubmit", dataE);
  
    fetch(`${URL}client_editLote.php`, {
      method: "POST",
      body: dataE,
    }).then(function (response) {
      response.text().then((resp) => {
        const dataResp = resp;
        console.log(dataResp);
  
  
        // Restablecer el estado de edición o cerrar el formulario de edición
        setShowEdit(false);
        // Actualizar el estado para indicar que la tabla ha sido actualizada
        setIsTableUpdated(true);

        setShowTable(true);

      });
    });
  };
  

  

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const cancelEdit = () => {
    form.resetFields();
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
                // eslint-disable-next-line no-sequences
                onClick={() => (
                  setVisible(!visible), setShowTable(false), setShowEdit(false)
                )}
              >
                Volver
              </Button>
            </div>

            <MapasLotes />

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
              <Card
                style={{
                  width: "70%",
                  height: "40%",
                  marginTop: "16%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h1 className="titulos">NUEVO LOTE</h1>
                    <Divider
                      style={{ marginBottom: "10px", marginTop: "0px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "13px",
                          display: "inline-block",
                          marginBottom: "2px",
                          fontWeight: "bold",
                        }}
                      >
                        Nombre Lote:
                      </label>
                      <Input
                        placeholder="Ingrese nombre"
                        style={{
                          width: 150,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "13px",
                          display: "inline-block",
                          marginBottom: "2px",
                          fontWeight: "bold",
                        }}
                      >
                        Campo:
                      </label>
                      <Select
                        defaultValue="lucy"
                        style={{
                          width: 150,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "jack",
                            label: "Jack",
                          },
                          {
                            value: "lucy",
                            label: "Lucy",
                          },
                          {
                            value: "Yiminghe",
                            label: "yiminghe",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {showEdit && (
              <Card
                style={{
                  width: "660px",
                  height: "30%",
                  marginTop: "15%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <Form
                  form={form}
                  onFinish={onSubmit}
                  initialValues={dataEdit}
                  layout="vertical"
                >
                  <h1 className="titulos">EDITAR LOTE</h1>
                  <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Form.Item
                        name="nombre"
                        label="Nombre Lote"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        <Input style={{ width: "150px" }} />
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "50px",
                      }}
                    >
                      <Form.Item
                        name="has"
                        label="Has"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        <Input type="number" style={{ width: "80px" }} />
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "50px",
                      }}
                    >
                      <Form.Item
                        name="condicion"
                        label="Condición"
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                          width: "150px",
                        }}
                      >
                        <Select>
                          <Option value="PROPIO">PROPIO</Option>
                          <Option value="ALQUILADO">ALQUILADO</Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "50px",
                      }}
                    >
                      <Form.Item
                        name="participacion"
                        label="Participacion"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        <Input style={{ width: "80px" }} addonAfter="%" />
                      </Form.Item>
                    </div>
                  </div>

                  <Divider
                    style={{ marginBottom: "10px", marginTop: "10px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: "-5px", marginRight: "5px" }}
                    >
                      Guardar
                    </Button>
                    <Button
                      onClick={() => (
                        setShowEdit(false), setShowTable(true), cancelEdit()
                      )}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              </Card>
            )}
          </div>
        </>
      )}
    </>
  );
};
