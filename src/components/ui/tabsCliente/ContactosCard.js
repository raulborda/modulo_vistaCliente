/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Modal,
  Form,
  Input,
  Button,
  Select,
  message,
  Drawer,
  Tabs,
  Divider,
  DatePicker,
  App
} from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import "./tabsCliente.css";
import dayjs from "dayjs";
import TabPane from "antd/es/tabs/TabPane";
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;

const ContactosCard = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const [form] = Form.useForm();
  const [fecha, setFecha] = useState();

  const {
    contactosCli,
    roles,
    actualizaContacto,
    setActualizaContacto,
    btnCrear,
    setBtnCrear,
    idCliente,
  } = useContext(GlobalContext);

  const { Option } = Select;

  const [modalVisible, setModalVisible] = useState(false);
  const [contactoEditado, setContactoEditado] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [contactosBuscados, setContactosBuscados] = useState([]);

  const [selectedTab, setSelectedTab] = useState("1");
  const dateFormat = "DD/MM/YYYY";

  //! Buscar todos los contactos existentes
  useEffect(() => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URLDOS}modulos/clientView_buscarContactos.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setContactosBuscados(objetoData);
      });
    });
  }, [actualizaContacto]);

  const handleEditarContacto = (contacto) => {
    setContactoEditado(contacto);
    setFormValues(contacto);
    setModalVisible(true);

    setFecha(contacto?.con_fechanac);
    setFormValues(prev => ({ ...prev, con_fechanac: contacto.con_fechanac && dayjs(contacto.con_fechanac, dateFormat) }));
  };


  const handleInputChange = (field, value) => {
    let updatedValue = value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: updatedValue
    }));
  };

  const handleQuitarContacto = (contacto) => {
    //console.log(contacto)
    const tituloModal = `¿Desea desvincular al contacto: ${contacto.con_nombre}?`;
    confirm({
      title: tituloModal,
      icon: <ExclamationCircleFilled style={{ color: "red" }} />,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      cancelButtonProps: {
        className: "cancel-button",
      },
      onOk() {
        //clientView_desvincularContacto.php
        //console.log('Eliminar: ', contacto.con_id);
        const data = new FormData();
        data.append("idCon", Number(contacto.con_id));
        fetch(`${URLDOS}modulos/clientView_desvincularContacto.php`, {
          method: "POST",
          body: data,
        }).then(function (response) {
          response.text().then((resp) => {
            message.success("El contacto ha sido desvinculado exitosamente");
            setActualizaContacto(!actualizaContacto);
          });
        });
      },
      onCancel() {
      },
    });
  };

  //! seccion editar contacto
  const onFinish = () => {
    const updatedValues = {
      ...formValues,
    };

    const data = new FormData();
    data.append("idCon", Number(updatedValues.con_id));
    data.append("nombre", updatedValues.con_nombre);
    data.append("email", updatedValues.con_email1);
    data.append("tel", updatedValues.con_telefono1);
    data.append("mov", updatedValues.con_movil1);
    data.append("rol", Number(updatedValues.rol_id));
    fecha && data.append("fechanac", fecha);

    fetch(`${URLDOS}modulos/clientView_guardarEditContacto.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        // const data = resp;
        // const objetoData = JSON.parse(data);
      });
    });
    setFormValues({});
    setContactoEditado(null);
    setActualizaContacto(!actualizaContacto);
    setFecha(undefined);
    form.resetFields();
  };

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleSearch = (values) => {
    const data = new FormData();
    data.append("idCli", idCliente);
    data.append("idCon", Number(values.buscar));
    data.append("idRol", Number(values.roles));
    fetch(`${URLDOS}modulos/clientView_vincularContacto.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        //console.log(resp);
        message.success("El contacto ha sido vinculado exitosamente");
        setActualizaContacto(!actualizaContacto);
        setBtnCrear(false);
      });
    });
  };

  const handleFormSubmit = (values) => {
    const data = new FormData();
    data.append("idCli", idCliente);
    data.append("nombre", values.nombre);
    data.append("email", values.email);
    data.append("telefono", values.telefono);
    data.append("movil", values.movil);
    data.append("descrip", values.descrip);
    data.append("idRol", Number(values.roles));
    fecha && data.append("fechanac", fecha);

    fetch(`${URLDOS}modulos/clientView_crearContacto.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        message.success("El contacto se ha creado y vinculado exitosamente");
        setActualizaContacto(!actualizaContacto);
        setBtnCrear(false);
        setFecha(undefined);
      });
    });
    
  };

  //Manejo de datepicker
  const handleFecha = (e, fechaNac) => {
    fechaNac ? setFecha(fechaNac) : setFecha(undefined);
  };

  const filterOptions = (inputValue, option) => {
    // Filtrar las opciones de contactosBuscados que coinciden con el texto ingresado
    return option.children.toLowerCase().includes(inputValue.toLowerCase());
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          userSelect: "none",
        }}
      >
        {contactosCli?.map((contacto, index) => (
          <div
            key={index}
            style={{
              width: "350px",
              flexBasis: "30%",
              padding: "5px",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{contacto.con_nombre.toUpperCase()}</span>
                  <div>
                    <EditOutlined
                      onClick={() => handleEditarContacto(contacto)}
                      style={{ color: "#56b43c" }}
                    />
                    <DeleteOutlined
                      onClick={() => handleQuitarContacto(contacto)}
                      style={{ color: "red", marginLeft: "10px" }}
                    />
                  </div>
                </div>
              }
            >
              <p>
                <strong>Email:</strong>
                <label style={{ color: "#56b43c" }}>
                  {" "}
                  {contacto.con_email1}
                </label>
              </p>
              <p>
                <strong>Teléfono:</strong>
                <label style={{ color: "#56b43c" }}>
                  {" "}
                  {contacto.con_telefono1}
                </label>
              </p>
              <p>
                <strong>Móvil:</strong>
                <label style={{ color: "#56b43c" }}>
                  {" "}
                  {contacto.con_movil1}
                </label>
              </p>
              <p>
                <strong>Edad:</strong>
                <label style={{ color: "#56b43c"}}>
                  {" "}
                  {contacto.con_fechanac ? <>{dayjs().diff((dayjs(contacto.con_fechanac, dateFormat)), 'year')}  ({contacto.con_fechanac})</> : '' }           
                </label>
              </p>
              <p>
                <strong>Rol:</strong>
                <label style={{ color: "#56b43c" }}> {contacto.rol_desc}</label>
              </p>
            </Card>
          </div>
        ))}
      </div>

      {contactoEditado && (
        <Modal
          title={<h3 style={{ color: "#605d5f" }}>Editar Contacto</h3>}
          open={modalVisible}
          onCancel={() => (
            setModalVisible(false), setFormValues({}), setContactoEditado(null), setFecha(undefined)
          )}
          destroyOnClose
          width={500}
          footer={[
            <Button
              key="guardar"
              type="primary"
              htmlType="submit"
              onClick={() => (
                document.querySelector('button[type="submit"]').click(),
                setModalVisible(false)
              )}
              style={{ borderRadius: "0px" }}
            >
              GUARDAR
            </Button>,
          ]}
          style={{ marginTop: "-50px" }}
        >
          <div style={{ width: "100%", marginLeft: "0px" }}>
            <Form onFinish={onFinish} labelCol={{ span: 24 }} initialValues={formValues} >
              <Form.Item label="Nombre" name="con_nombre">
                <Input
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                  defaultValue={formValues.con_nombre}
                  onChange={(e) =>
                    handleInputChange("con_nombre", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Email" name="con_email1">
                <Input
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                  defaultValue={formValues.con_email1}
                  onChange={(e) =>
                    handleInputChange("con_email1", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Teléfono" name="con_telefono1">
                <Input
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                  defaultValue={formValues.con_telefono1}
                  onChange={(e) =>
                    handleInputChange("con_telefono1", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Móvil" name="con_movil1">
                <Input
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                  defaultValue={formValues.con_movil1}
                  onChange={(e) =>
                    handleInputChange("con_movil1", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item name="con_fechanac" className="formItem-style" label="Fecha de nacimiento">
                      <DatePicker format={dateFormat}  
                        style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                      width: "100%"
                    }} onChange={handleFecha} 
                    />
              </Form.Item>          

              <Form.Item label="Rol" name="rol_desc">
                <Select
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                  defaultValue={formValues.rol_id}
                  onChange={(value) => handleInputChange("rol_id", value)}
                >
                  {roles.map((rol) => (
                    <Option value={rol.rol_id} key={rol.rol_id}>
                      {rol.rol_desc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ display: "none" }}
              >
                GUARDAR
              </Button>
            </Form>
          </div>
        </Modal>
      )}

      {btnCrear ? (
        <Drawer
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>CREAR CONTACTO</span>
            </div>
          }
          closable={false}
          onClose={() => setBtnCrear(false)}
          open={btnCrear}
          width={550}
          placement="right"
        >
          <Tabs
            className="tabs_contactos"
            activeKey={selectedTab}
            onChange={handleTabChange}
          >
            <TabPane tab="Existente" key="1">
              <Form onFinish={handleSearch} layout="vertical" destroyOnClose={true} >
                <Form.Item name="buscar" label="Buscar Contacto">
                  <Select
                    showSearch // Habilitar la funcionalidad de búsqueda
                    placeholder="Buscar"
                    style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                    }}
                    filterOption={filterOptions} // Aplicar la función de filtrado
                  >
                    {contactosBuscados.map((contacto) => (
                      <Option
                        key={contacto.con_id}
                        value={contacto.con_id}
                        label={contacto.con_nombre}
                      >
                        {contacto.con_nombre}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="roles" label="Roles" initialValue="8">
                  <Select
                    style={{
                      width: 320,
                      marginTop: "-3px",
                      marginBottom: "10px",
                    }}
                  >
                    {roles.map((rol) => (
                      <Option value={rol.rol_id} key={rol.rol_id}>
                        {rol.rol_desc}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
                <Form.Item>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ fontWeight: "500", borderRadius: "0px" }}
                    >
                      GUARDAR
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Nuevo" key="2" >
              <Form onFinish={handleFormSubmit} layout="vertical">
                <Form.Item name="nombre" label="Nombre">
                  <Input
                    placeholder="Ingrese Nombre"
                    style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                    }}
                  />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input
                    placeholder="Ingrese Email"
                    style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                    }}
                  />
                </Form.Item>
                <Form.Item name="telefono" label="Teléfono">
                  <Input
                    placeholder="Ingrese Telefono"
                    style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                    }}
                  />
                </Form.Item>
                <Form.Item name="movil" label="Movil">
                  <Input
                    placeholder="Ingrese Movil"
                    style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                    }}
                  />
                </Form.Item>

                <Form.Item name="fechaNac" className="formItem-style" label="Fecha de nacimiento">
                        <DatePicker format={dateFormat}  style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                      width: "100%"
                    }} onChange={handleFecha} />
                </Form.Item>

                <Form.Item name="descrip" label="Descripción">
                  <TextArea
                    style={{
                      marginTop: "-3px",
                      marginBottom: "10px",
                      borderRadius: "0px",
                    }}
                  />
                </Form.Item>
                <Form.Item name="roles" initialValue="8" label="Roles">
                  <Select style={{ width: 320 }}>
                    {roles.map((rol) => (
                      <Option value={rol.rol_id} key={rol.rol_id}>
                        {rol.rol_desc}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
                <Form.Item>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ fontWeight: "500", borderRadius: "0px" }}
                    >
                      GUARDAR
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Drawer>
      ) : null}
    </>
  );
};

export default () => (
  <App>
    <ContactosCard />
  </App>
);