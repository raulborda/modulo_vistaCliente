import React, { useContext, useState } from "react";
import { Card, Modal, Form, Input, Button, Select, message } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import "./tabsCliente.css";
const { confirm } = Modal;


const ContactosCard = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const [form] = Form.useForm();
  

  const { contactosCli, roles, actualizaContacto, setActualizaContacto } = useContext(GlobalContext);

  const { Option } = Select;

  const [modalVisible, setModalVisible] = useState(false);
  const [contactoEditado, setContactoEditado] = useState(null);
  const [formValues, setFormValues] = useState({});

  const handleEditarContacto = (contacto) => {
    setContactoEditado(contacto);
    setFormValues(contacto);
    setModalVisible(true);
  };


  //console.log("Contacto Data: ", formValues);

  const handleInputChange = (field, value) => {
    let updatedValue = value;

    //console.log("handleInputChange:", value)

    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: updatedValue,
    }));
  };

  const handleQuitarContacto = (contacto) => {
    //console.log(contacto)
    const tituloModal = `¿Desea desvincular al contacto: ${contacto.con_nombre}?`;
    confirm({
      title: tituloModal,
      icon: <ExclamationCircleFilled style={{color:"red"}}/>,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      cancelButtonProps:{
        className: 'cancel-button',
      },
      onOk() {
        //clientView_desvincularContacto.php
        //console.log('Eliminar: ', contacto.con_id);
        const data = new FormData();
        data.append("idCon", Number(contacto.con_id));
        fetch(`${URLDOS}clientView_desvincularContacto.php`, {
          method: "POST",
          body: data,
        }).then(function (response) {
          response.text().then((resp) => {
            console.log(resp)
            message.success('El contacto ha sido desvinculado exitosamente');
            setActualizaContacto(!actualizaContacto);
          });
        });
      },
      onCancel() {
        console.log('Se Cancelo Desvinculacion');
      },
    });
  };

  const onFinish = () => {
    const updatedValues = {
      ...formValues
    };

    const data = new FormData();
    data.append("idCon", Number(updatedValues.con_id));
    data.append("nombre", updatedValues.con_nombre);
    data.append("email", updatedValues.con_email1);
    data.append("tel", updatedValues.con_telefono1);
    data.append("mov", updatedValues.con_movil1);
    data.append("rol", Number(updatedValues.rol_id));
    fetch(`${URLDOS}clientView_guardarEditCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        // const data = resp;
        // const objetoData = JSON.parse(data);
        console.log(resp)
      });
    });
    console.log("Formulario enviado:", updatedValues);
    setFormValues({});
    setContactoEditado(null);
    setActualizaContacto(!actualizaContacto);
    form.resetFields();
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
            style={{
              width: "350px",
              flexBasis: "30%",
              padding: "5px",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            <Card
              key={index}
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
          onCancel={() => (setModalVisible(false),  setFormValues({}), setContactoEditado(null))}
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
            <Form onFinish={onFinish} labelCol={{ span: 24 }}>
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
    </>
  );
};

export default ContactosCard;
