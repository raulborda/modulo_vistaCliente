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
import { Button, Card, Divider, Form, Input, InputNumber, Popover, Select, Table } from "antd";
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
    showFormAgregar, 
    setShowFormAgregar,
  } = useContext(GlobalContext);

  const [showTable, setShowTable] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataAdd, setDataAdd] = useState(null);

  const toggleTable = () => {
    setShowTable(!showTable);
    setShowFormAgregar(false);
  };

  const abrirFormAgregar = () => {
    setShowFormAgregar(!showFormAgregar);
    setShowTable(false);
  };

  console.log("infoLotes:", infoLotes);
  console.log("cliente: ", idCliente);

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
    setDataEdit(record);
    console.log("click edit: ", record);
    console.log("StateEdit: ", record);
  };


  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        campo: dataEdit.campo,
        nombre: dataEdit.nombre,
        has: dataEdit.has,
        condicion: dataEdit.condicion,
        participacion: dataEdit.participacion
      });
    }
  }, [dataEdit]);



  const handleUbic = (data) => {
    console.log("click delete", data);
  };

  const onSubmit = (values) => {
    console.log("Formulario enviado con valores:", values);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const cancelEdit = () => {
    form.resetFields();
  }



  const onSubmitAdd = (values) => {
    setDataAdd(values)
    console.log('dataAdd: ', dataAdd)
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
                onClick={() => (setVisible(!visible), setShowTable(false))}
              >
                Volver
              </Button>
            </div>

            <MapasLotes />

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

              <Button
                style={{ marginTop: "8px" }}
                icon={<TableOutlined />}
                onClick={() => toggleTable()}
              ></Button>
              <Button
                icon={<PlusOutlined />}
                onClick={() => abrirFormAgregar()}
                style={{ marginTop: '5px' }}
              />
            </div>

            {
              showTable && (
                <Card
                  style={{
                    width: "65%",
                    height: "30%",
                    marginTop: "15%",
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
              )
            }
            {
              showFormAgregar && (
                <Card
                  style={{
                    width: "70%",
                    height: "40%",
                    marginTop: "16%",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Form form={form} onFinish={onSubmitAdd} >
                    <h1 className="titulos" >NUEVO LOTE</h1>
                    <Divider style={{ marginBottom: '10px', marginTop: '0px' }} />
                    <Form.Item
                      name="nombre"
                      label="Nombre Lote"

                    >
                      <Input onChange={(e) => setDataAdd({ ...dataAdd, nombre: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                      name="has"
                      label="Has"
                    >
                      <Input type="number" onChange={(e) => setDataAdd({ ...dataAdd, has: e.target.value })} />
                    </Form.Item>

                    <Form.Item name="campo" label="Campo">
                      <Select onChange={(value) => setDataAdd({ ...dataAdd, campo: value })} >
                        <Option value="Don Julio">Don Julio</Option>
                        <Option value="Las 35">Las 35</Option>
                      </Select>
                    </Form.Item>


                    <h1 className="titulos" >PARTICIPACIÓN</h1>
                    <Divider style={{ marginBottom: '10px', marginTop: '0px' }} />
                    <Form.Item
                      name="participacion"
                      label="Participacion"
                    >
                      <InputNumber
                        onChange={(value) => setDataAdd({ ...dataAdd, participacion: value })}
                        defaultValue={100}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace('%', '')}
                      // onChange={onChange}
                      />
                    </Form.Item>

                    <Form.Item name="condicion" label="Condición">
                      <Select onChange={(value) => setDataAdd({ ...dataAdd, condicion: value })}>
                        <Option value="PROPIO">PROPIO</Option>
                        <Option value="ALQUILADO">ALQUILADO</Option>
                      </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                      Guardar
                    </Button>
                    <Button onClick={{}}>
                      Cancelar
                    </Button>
                  </Form>
                </Card>
              )
            }

            {
              showEdit && (
                <Card
                  style={{
                    width: "65%",
                    height: "30%",
                    marginTop: "15%",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Form form={form} onFinish={onSubmit} initialValues={dataEdit}>
                    <h3>Editar Lote</h3>
                    <Form.Item
                      name="nombre"
                      label="Nombre Lote"

                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="has"
                      label="Has"
                    >
                      <Input type="number" />
                    </Form.Item>

                    <Form.Item name="condicion" label="Condición">
                      <Select>
                        <Option value="PROPIO">PROPIO</Option>
                        <Option value="ALQUILADO">ALQUILADO</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="participacion"
                      label="Participacion"
                    >
                      <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                      Guardar
                    </Button>
                    <Button onClick={() => (setShowEdit(false), setShowTable(true), cancelEdit())}>
                      Cancelar
                    </Button>
                  </Form>
                </Card>
              )
            }
          </div >
        </>
      )}
    </>
  );
};
