import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Divider, Form, Input, Select } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { EditOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import AdminEtiqueta from "../etiquetasCliente/AdminEtiqueta";
import TextArea from "antd/es/input/TextArea";

const ClienteCard = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const [form] = Form.useForm();

  const {
    infoCliSelect,
    etiquetasCli,
    usu,
    actualizaCli,
    setActualizaCli,
    setOpen,
  } = useContext(GlobalContext);

  //console.log(infoCliSelect)

  const [editAdminTags, setEditAdminTags] = useState(false);
  const [cliFav, setCliFav] = useState(true);
  const [editCli, setEditCli] = useState(false);

  //STATES QUE GUARDA LO QUE TRAE DE BASE DE DATOS ----------------------------------------------------------------
  const [sector, setSector] = useState(null);
  const [tamaño, setTamaño] = useState(null);
  const [tiposCliente, setTiposClientes] = useState(null);
  const [grupoUno, setGrupoUno] = useState(null);
  const [grupoDos, setGrupoDos] = useState(null);
  //---------------------------------------------------------------------------------------------------------------

  // STATE PARA FORM PARA ACTUALIZAR DATOS DEL CLIENTE-------------------------------------------------------------------
  const [nombre, setNombre] = useState(infoCliSelect[0]?.cli_nombre);
  const [descripcion, setDescripcion] = useState(infoCliSelect[0]?.cli_descripcion);
  const [telefono, setTelefono] = useState(infoCliSelect[0]?.cli_telefono1);
  const [celular, setCelular] = useState(infoCliSelect[0]?.cli_telefono2);
  const [mail, setMail] = useState(infoCliSelect[0]?.cli_email1);
  const [cuit, setCuit] = useState(infoCliSelect[0]?.cli_cuit);
  const [tipoCli, setTipoCli] = useState(infoCliSelect[0]?.tip_id);
  //const [segmento, setSegmento] = useState(infoCliSelect[0]?.aseg_desc);
  const [sec, setSec] = useState(infoCliSelect[0]?.sec_id);
  const [tamano, setTamano] = useState(infoCliSelect[0]?.tam_id);
  const [zona, setZona] = useState(infoCliSelect[0]?.gruuno_id);
  const [centro, setCentro] = useState(infoCliSelect[0]?.grudos_id);

  //-------------------------------------------------------------------------------------------------------------

  // CONSULTAS A BASE DE DATOS QUE LLENAN LOS SELECTS CON LAS OPCIONES ------------------------------------------

  const cargarSector = () => {
    const data = new FormData();
    data.append("idU", usu);
    fetch(`${URLDOS}sectorCli.php`, {
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
    fetch(`${URLDOS}tamanoCli.php`, {
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
    fetch(`${URLDOS}tiposCli.php`, {
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
    fetch(`${URLDOS}gruUnoCli.php`, {
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
    fetch(`${URLDOS}gruDosCli.php`, {
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
    // console.log(values);

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
    data.append("zona", Number(values.zona));
    data.append("centro", Number(values.centro));
    fetch(`${URLDOS}clientView_editarCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
      });
    });

    setActualizaCli(!actualizaCli);
    setEditCli(false);
    setOpen(false);
    form.resetFields();
  };

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
            <label>
              {" "}
              {infoCliSelect[0]?.cli_idsistema
                ? infoCliSelect[0]?.cli_idsistema
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Descripción:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.cli_descripcion
                ? infoCliSelect[0]?.cli_descripcion
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Tipo Cliente:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.tip_desc
                ? infoCliSelect[0]?.tip_desc
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Teléfono:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.cli_telefono1
                ? infoCliSelect[0]?.cli_telefono1
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Celular:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.cli_telefono2
                ? infoCliSelect[0]?.cli_telefono2
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Correo Electrónico:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.cli_email1
                ? infoCliSelect[0]?.cli_email1
                : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">CUIT:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.cli_cuit ? infoCliSelect[0]?.cli_cuit : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Segmento:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.aseg_desc ? infoCliSelect[0]?.aseg_desc : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Tamaño:</label>
            <label>
              {" "}
              {infoCliSelect[0]?.tam_desc ? infoCliSelect[0]?.tam_desc : "-"}
            </label>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Sector:</label>
            <lebel>
              {" "}
              {infoCliSelect[0]?.sec_desc ? infoCliSelect[0]?.sec_desc : "-"}
            </lebel>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Zona:</label>
            <lebel>
              {" "}
              {infoCliSelect[0]?.gruuno_desc
                ? infoCliSelect[0]?.gruuno_desc
                : "-"}
            </lebel>
          </p>

          <p style={{ marginBottom: "10px" }}>
            <label className="fontWeightLabel">Centro:</label>
            <lebel>
              {" "}
              {infoCliSelect[0]?.grudos_desc
                ? infoCliSelect[0]?.grudos_desc
                : "-"}
            </lebel>
          </p>
        </div>
      ) : (
        <Form labelCol={{ span: 10 }} layout="vertical" onFinish={guardarCli}>
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
                initialValue={nombre}
                onChange={(e) => setNombre(e.target.value)}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Descripción"
                name="descripcion"
                style={{ marginTop: "10px" }}
                initialValue={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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
              <Form.Item
                label="Teléfono"
                name="telefono"
                initialValue={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              >
                <Input style={{ width: "170px" }} />
              </Form.Item>
              <Form.Item
                label="Celular"
                name="celular"
                className="hidden-asterisk"
                initialValue={celular}
                onChange={(e) => setCelular(e.target.value)}
              >
                <Input style={{ width: "170px" }} />
              </Form.Item>
            </div>

            <Form.Item
              label="Email"
              name="email"
              style={{ marginTop: "10px" }}
              initialValue={mail}
              onChange={(e) => setMail(e.target.value)}
            >
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
              <Form.Item
                label="CUIT"
                name="cuit"
                className="hidden-asterisk"
                initialValue={cuit}
                onChange={(e) => setCuit(e.target.value)}
              >
                <Input style={{ width: "170px" }} />
              </Form.Item>

              <Form.Item
                label="Tamaño"
                name="tamano"
                className="hidden-asterisk"
                initialValue={tamano}
                onChange={(e) => setTamano(e.target.value)}
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
                initialValue={tipoCli}
                onChange={(e) => setTipoCli(e.target.value)}
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
                label="Actividad Comercial"
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
                name="sector"
                className="hidden-asterisk"
                initialValue={sec}
                onChange={(e) => setSec(e.target.value)}
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
                label="Zona"
                name="zona"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione la zona",
                  },
                ]}
                className="hidden-asterisk"
                initialValue={zona}
                onChange={(e) => setZona(e.target.value)}
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
                label="Centro"
                name="centro"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione el centro",
                  },
                ]}
                className="hidden-asterisk"
                initialValue={centro}
                onChange={(e) => setCentro(e.target.value)}
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
          <>
            <div
              className="selected_tag"
              style={{
                background: tag.etq_color,
                display: "inline-block",
                margin: "3px",
                padding: "1px",
              }}
              key={tag.etq_id}
            >
              <div>
                <span className="etq_nameD">
                  {tag.etq_nombre.toUpperCase()}
                </span>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ClienteCard;
