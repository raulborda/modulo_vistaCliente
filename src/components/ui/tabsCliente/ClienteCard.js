/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Button, Divider, Input, Select } from "antd";
import { Form } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { EditOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import AdminEtiqueta from "../etiquetasCliente/AdminEtiqueta";
import TextArea from "antd/es/input/TextArea";
import { Tag } from "../../utils/CardBrightness"

const ClienteCard = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const [form] = Form.useForm();

  const {
    infoCliSelect,
    etiquetasCli,
    usu,
    actualizaCli,
    setActualizaCli,
    editAdminTags,
    setEditAdminTags,
    editCli,
    setEditCli,
  } = useContext(GlobalContext);

  const [cliFav, setCliFav] = useState(true);

  //STATES QUE GUARDA LO QUE TRAE DE BASE DE DATOS ----------------------------------------------------------------
  const [sector, setSector] = useState(null);
  const [tamaño, setTamaño] = useState(null);
  const [tiposCliente, setTiposClientes] = useState(null);
  const [grupoUno, setGrupoUno] = useState(null);
  const [grupoDos, setGrupoDos] = useState(null);
  const [conf, setConf] = useState();
  //---------------------------------------------------------------------------------------------------------------

  // CONSULTAS A BASE DE DATOS QUE LLENAN LOS SELECTS CON LAS OPCIONES ------------------------------------------

  const cargarSector = () => {
    const data = new FormData();
    data.append("idU", usu);
    fetch(`${URLDOS}modulos/sectorCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setSector(objetoData);
      });
    });
  };

  const cargarTamaño = () => {
    const data = new FormData();
    data.append("idU", usu);
    fetch(`${URLDOS}modulos/tamanoCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setTamaño(objetoData);
      });
    });
  };

  const cargarTipClientes = () => {
    const data = new FormData();
    data.append("idU", usu);
    fetch(`${URLDOS}modulos/tiposCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setTiposClientes(objetoData);
      });
    });
  };

  const cargarGruUno = () => {
    const data = new FormData();
    data.append("idU", usu);
    fetch(`${URLDOS}modulos/gruUnoCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setGrupoUno(objetoData);
      });
    });
  };

  const cargarGruDos = () => {
    const data = new FormData();
    data.append("idU", usu);
    fetch(`${URLDOS}modulos/gruDosCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setGrupoDos(objetoData);
      });
    });
  };

  useEffect(() => {
    cargarSector();

    cargarTamaño();

    cargarTipClientes();

    cargarGruUno();

    cargarGruDos();
  }, []);

  // -------------------------------------------------------------------------------------------------------------

  const editTags = () => {
    setEditAdminTags(!editAdminTags);
  };

  const editFav = () => {
    setCliFav(!cliFav);
  };

  const editInfoCli = () => {
    setEditCli(!editCli);
  };

  const guardarCli = (values) => {
    const data = new FormData();
    data.append("idUsu", usu);
    data.append("idCli", Number(infoCliSelect[0]?.cli_id));
    data.append("razonSocial", values.razonSocial);
    data.append("descripcion", values.descripcion);
    data.append("telefono", values.telefono);
    data.append("celular", values.celular);
    data.append("cuit", values.cuit);
    data.append("email", values.email);
    data.append("sector", Number(values.sector));
    data.append("tipoClientes", Number(values.tipoClientes));
    data.append("tamano", Number(values.tamano));
    data.append("zona", values.zona);
    data.append("centro", values.centro);
    fetch(`${URLDOS}modulos/clientView_editarCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
      });
    });

    setActualizaCli(!actualizaCli);
    setEditCli(false);
    form.resetFields();
  };

  useEffect(() => {
    if (infoCliSelect?.length > 0) {
      let data = infoCliSelect[0];

      form.setFieldsValue({
        razonSocial: data.cli_nombre,
        descripcion: data.cli_descripcion,
        telefono: data.cli_telefono1,
        celular: data.cli_telefono2,
        cuit: data.cli_cuit,
        email: data.cli_email1,
        sector: data.sec_id,
        tipoClientes: data.tip_id,
        tamano: data.tam_id,
        zona: data.gruuno_id,
        centro: data.grudos_id,
      });
    }
  }, [infoCliSelect]);

  useEffect(() => {
    const url = `${URLDOS}modulos/getConf.php`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setConf(data);
      });
  }, []);

  return (
    <>
      {!editCli ? (
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontWeight: "600" }}>
            {infoCliSelect[0]?.cli_nombre}
          </span>

          <EditOutlined
            style={{ color: "#56b43c", fontSize: "16px", float: "right" }}
            onClick={() => editInfoCli()}
          />

          {cliFav ? (
            <HeartFilled
              style={{
                float: "right",
                color: "red",
                marginTop: "0.5px",
                marginRight: "10px",
              }}
              onClick={() => editFav()}
            />
          ) : (
            <HeartOutlined
              style={{
                float: "right",
                color: "red",
                marginTop: "0.5px",
                marginRight: "10px",
              }}
              onClick={() => editFav()}
            />
          )}
        </div>
      ) : null}

      {!editCli ? (
        <div>
          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Cuenta:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.cli_idsistema
                ? infoCliSelect[0]?.cli_idsistema
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Descripción:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.cli_descripcion
                ? infoCliSelect[0]?.cli_descripcion
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Tipo Cliente:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.tip_desc ? infoCliSelect[0]?.tip_desc : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Teléfono:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.cli_telefono1
                ? infoCliSelect[0]?.cli_telefono1
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Celular:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.cli_telefono2
                ? infoCliSelect[0]?.cli_telefono2
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Email:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.cli_email1
                ? infoCliSelect[0]?.cli_email1
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">CUIT:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.cli_cuit ? infoCliSelect[0]?.cli_cuit : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Segmento:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.aseg_desc ? infoCliSelect[0]?.aseg_desc : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Tamaño:</label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.tam_desc ? infoCliSelect[0]?.tam_desc : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">
              Sector:
              {/* {conf ? conf[0].grupo2 : "-"}: */}
            </label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.sec_desc ? infoCliSelect[0]?.sec_desc : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">
              {" "}
              {conf ? conf[0].grupo1 : "-"}:
            </label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.gruuno_desc
                ? infoCliSelect[0]?.gruuno_desc
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">
              {conf ? conf[0].grupo2 : "-"}:
            </label>
            <label className="labelValue">
              {" "}
              {infoCliSelect[0]?.grudos_desc
                ? infoCliSelect[0]?.grudos_desc
                : "-"}
            </label>
          </p>
        </div>
      ) : (
        <Form
          form={form}
          labelCol={{ span: 10 }}
          layout="vertical"
          onFinish={guardarCli}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Form.Item
                style={{ marginTop: "-10px" }}
                label="Razón Social"
                name="razonSocial"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa la razón social",
                  },
                ]}
                className="hidden-asterisk"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Descripción"
                name="descripcion"
                style={{ marginTop: "10px" }}
              >
                <TextArea />
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Form.Item label="Teléfono" name="telefono">
                <Input style={{ width: "170px" }} />
              </Form.Item>
              <Form.Item
                label="Celular"
                name="celular"
                className="hidden-asterisk"
              >
                <Input style={{ width: "170px" }} />
              </Form.Item>
            </div>

            <Form.Item label="Email" name="email" style={{ marginTop: "10px" }}>
              <Input />
            </Form.Item>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Form.Item label="CUIT" name="cuit" className="hidden-asterisk">
                <Input style={{ width: "170px" }} />
              </Form.Item>

              <Form.Item
                label="Tamaño"
                name="tamano"
                className="hidden-asterisk"
              >
                {tamaño ? (
                  <Select style={{ width: "170px" }}>
                    {tamaño.map((tam) => (
                      <Select.Option key={tam.tam_id} value={tam.tam_id}>
                        {tam.tam_desc}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select.Option value="CARGANDO">
                    CARGANDO OPCIONES...
                  </Select.Option>
                )}
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Form.Item
                label="Tipo Cliente"
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
                name="tipoClientes"
                className="hidden-asterisk"
              >
                {tiposCliente ? (
                  <Select style={{ width: "170px" }}>
                    {tiposCliente.map((tip) => (
                      <Select.Option key={tip.tip_id} value={tip.tip_id}>
                        {tip.tip_desc}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select.Option value="CARGANDO">
                    CARGANDO OPCIONES...
                  </Select.Option>
                )}
              </Form.Item>
              <Form.Item
                label="Sector"
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
                name="sector"
                className="hidden-asterisk"
              >
                {sector ? (
                  <Select style={{ width: "170px" }}>
                    {sector.map((sec) => (
                      <Select.Option key={sec.sec_id} value={sec.sec_id}>
                        {sec.sec_desc}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select.Option value="CARGANDO">
                    CARGANDO OPCIONES...
                  </Select.Option>
                )}
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Form.Item
                label={conf ? conf[0].grupo1 : "-"}
                name="zona"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione la zona",
                  },
                ]}
                className="hidden-asterisk"
              >
                {grupoUno ? (
                  <Select style={{ width: "170px" }}>
                    {grupoUno.map((uno) => (
                      <Select.Option key={uno.gruuno_id} value={uno.gruuno_id}>
                        {uno.gruuno_desc}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select.Option value="CARGANDO">
                    CARGANDO OPCIONES...
                  </Select.Option>
                )}
              </Form.Item>
              <Form.Item
                label={conf ? conf[0].grupo2 : "-"}
                name="centro"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione el centro",
                  },
                ]}
                className="hidden-asterisk"
              >
                {grupoDos ? (
                  <Select style={{ width: "170px" }}>
                    {grupoDos.map((dos) => (
                      <Select.Option key={dos.grudos_id} value={dos.grudos_id}>
                        {dos.grudos_desc}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select.Option value="CARGANDO">
                    CARGANDO OPCIONES...
                  </Select.Option>
                )}
              </Form.Item>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              bottom: "0",
              width: "100%",
            }}
          >
            <Button
              type="default"
              onClick={() => setEditCli(false)}
              style={{ width: "48%", borderRadius: "0px" }}
            >
              CANCELAR
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "48%", borderRadius: "0px" }}
            >
              GUARDAR
            </Button>
          </div>
        </Form>
      )}

      <Divider />

      {/* seccion etiquetas*/}
      {!editCli ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
              }}
            >
              ETIQUETAS
            </span>
            <EditOutlined
              style={{ color: "#56b43c", fontSize: "16px" }}
              onClick={() => editTags()}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            {editAdminTags ? <AdminEtiqueta /> : null}
          </div>

          <div
            className="selected_tags"
            style={{
              marginTop: "10px",
              maxWidth: "400px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {etiquetasCli?.map((tag) => (
              // <>
              //   <div
              //     className="selected_tag"
              //     style={{
              //       background: tag.etq_color,
              //     }}
              //     key={tag.etq_id}
              //   >
              //     <span className="etq_name">
              //       {tag.etq_nombre.toUpperCase()}
              //     </span>
              //   </div>
              // </>
              <Tag key={tag.etq_id} hex={tag.etq_color} nombre={tag.etq_nombre.toUpperCase()} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ClienteCard;
