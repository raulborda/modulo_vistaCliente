import React, { useContext, useState } from "react";
import { Button, Card, Divider, Form, Input, Select } from "antd";
import { GlobalContext } from "../../../context/GlobalContext";

const AgregarLotes = () => {
const URL = process.env.REACT_APP_URL;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [a, setA] = useState(false);

  const {
    idCliente,
    //Ver lotes
    setShowFormAgregar,
    valorGeoJSON,
    setValorGeoJSON,
    campos,
    setCampos,
    clientes,
    setClientes,
    showFormAgregar,
  } = useContext(GlobalContext);

  if (showFormAgregar) {
    traeCampos();
    traeClientes();
  }

  function traeCampos() {
    const data = new FormData();
    fetch(`${URL}lot_listCampos.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setCampos(objetoData);
      });
    });
  }

  function traeClientes() {
    const data = new FormData();
    fetch(`${URL}lot_listClientes.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setClientes(objetoData);
      });
    });
  }

 
  const onSubmitAdd = (values) => {
    // setDataAdd(values)
    // console.log('dataAdd: ', dataAdd)
    if (valorGeoJSON.length === 0) {
      setA(true);
    } else {
      const dataAdd = new FormData();
      dataAdd.append("idC", idCliente);
      dataAdd.append("lote", values.nombre);
      dataAdd.append("has", values.has);
      dataAdd.append("campo", values.campo);
      dataAdd.append("cliente", values.cliente);
      dataAdd.append("participacion", values.participacion);
      dataAdd.append("condicion", values.condicion);
      dataAdd.append("valorGeoJSON", JSON.stringify(valorGeoJSON));

      console.log("valorGeoJSON: ", valorGeoJSON);
      console.log("onSubmitAdd: ", dataAdd);

      fetch(`${URL}client_addLote.php`, {
        method: "POST",
        body: dataAdd,
      }).then(function (response) {
        response.text().then((resp) => {
          const data = resp;
          console.log("data: ", data);
        });
      });

      setShowFormAgregar(false);
      form.resetFields();
      setValorGeoJSON([]);
    }
  };

  return (
    <>
      <Card
        style={{
          width: "800px",
          height: "40%",
          marginTop: "16%",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <Form form={form} onFinish={onSubmitAdd}>
          <div>
            <h1 className="titulos">NUEVO LOTE</h1>
            <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "15px",
              }}
            >
              <Form.Item
                name="nombre"
                label="Nombre Lote"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del lote",
                  },
                ]}
              >
                <Input
                  /*onChange={(e) => setDataAdd({ ...dataAdd, nombre: e.target.value })}*/ style={{
                    width: "200px",
                    marginRight: "15px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="has"
                label="Has"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese las hectáreas del lote",
                  },
                ]}
              >
                <Input
                  type="number"
                  /*onChange={(e) => setDataAdd({ ...dataAdd, has: e.target.value })}*/ style={{
                    width: "150px",
                    marginRight: "15px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="campo"
                label="Campo"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona un cliente",
                  },
                ]}
              >
                <Select
                  style={{ width: "150px" }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children &&
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {campos &&
                    campos.map((campo) => (
                      <Select.Option key={campo.cam_id} value={campo.cam_id}>
                        {campo.cam_nombre}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <h1 className="titulos">PARTICIPACIÓN</h1>
            <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "5px",
              }}
            >
              <Form.Item
                name="cliente"
                label="Cliente"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona un cliente",
                  },
                ]}
              >
                <Select
                  style={{ width: "200px", marginRight: "15px" }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children &&
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {clientes &&
                    clientes.map((cliente) => (
                      <Select.Option
                        key={cliente.cli_id}
                        value={cliente.cli_id}
                      >
                        {cliente.cli_nombre}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="participacion"
                label="Participación"
                style={{ marginRight: "10px" }}
              >
                <Input style={{ width: "82px" }} addonAfter="%" />
              </Form.Item>

              <Form.Item
                name="condicion"
                label="Condición"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona una condición",
                  },
                ]}
              >
                <Select
                  /*onChange={(value) => setDataAdd({ ...dataAdd, condicion: value })}*/ style={{
                    width: "200px",
                    marginRight: "15px",
                  }}
                >
                  <Option value="1">PROPIO</Option>
                  <Option value="2">ALQUILADO</Option>
                </Select>
              </Form.Item>
            </div>

            <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                {a ? (
                  <label style={{ color: "red" }}>
                    * Por favor marque el lote
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Guardar
                </Button>
                <Button
                  onClick={() => (
                    setShowFormAgregar(false), form.resetFields()
                  )}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default AgregarLotes;
