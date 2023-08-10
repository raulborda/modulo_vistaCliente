import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { Button, Card, Divider, Form, Input, Select, message } from "antd";

const EditarLotes = () => {
  const URL = process.env.REACT_APP_URL;
  const [form] = Form.useForm();
  const { Option } = Select;

  const {
    idCliente,
    loteId,
    setLoteId,
    setIsTableUpdated,
    setSelectedLote,
    usu,
    setC,
    geoJSONModificado,
    setShowTable,
    setShowEdit,
    dataEdit,
    setTipoMapa,
    tipoMapa,
  } = useContext(GlobalContext);

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const dataE = new FormData();
      dataE.append("usu", usu);
      dataE.append("idC", idCliente);
      dataE.append("idLote", loteId);
      dataE.append("lote", values.nombre);
      dataE.append("has", values.has);
      dataE.append("condicion", values.condicion);
      dataE.append("participacion", 100);
      dataE.append("geoJSON", JSON.stringify(geoJSONModificado));

      const response = await fetch(`${URL}modulos/client_editLote.php`, {
        method: "POST",
        body: dataE,
      });

      if (response.ok) {
        const resp = await response.text();
        const dataResp = resp;
        // Llamar a la función para almacenar los datos actualizados en localStorage
        handleTableUpdate(values);
        // Restablecer el estado de edición o cerrar el formulario de edición
        setShowEdit(false);
        // Actualizar el estado para indicar que la tabla ha sido actualizada
        setIsTableUpdated(true);
        // setSelectedLote(null);
        setShowTable(true);
        setC(false);
        setTipoMapa(0);
        message.success("Lote editado exitosamente");
      } else {
        throw new Error("Error al editar el lote");
      }
    } catch (error) {
      console.log("Error: ", error);
      message.error("Error al editar lote");
    } finally {
      setSelectedLote(null);
      setLoading(false);
    }
  };

  const handleTableUpdate = (updatedData) => {
    // Guardar los datos actualizados en localStorage
    localStorage.setItem("updatedLotesData", JSON.stringify(updatedData));
  };

  const cancelEdit = () => {
    form.resetFields();
    setSelectedLote(null);
  };

  return (
    <>
      {/* Renderizar el componente de mensaje */}
      {contextHolder}
      {tipoMapa === 1 &&
        <Card
          style={{
            width: "510px",
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
                {/* <Form.Item
                  name="participacion"
                  label="Participacion"
                  style={{ fontSize: "13px", fontWeight: "bold" }}
                >
                  <Input style={{ width: "85px" }} addonAfter="%" />
                </Form.Item> */}
              </div>
            </div>
            <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
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
                  setShowEdit(false),
                  setShowTable(true),
                  cancelEdit(),
                  setSelectedLote(null),
                  setTipoMapa(0)
                )}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card>
      }
    </>
  );
};

export default EditarLotes;
