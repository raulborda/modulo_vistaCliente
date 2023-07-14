import React, { useContext, useEffect, useState } from "react";
import { Card, Modal, Form, Input, Button, Select, Spin } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./tabsCliente.css";

const ContactosCard = () => {
  const { contactosCli, roles, setRoles } = useContext(GlobalContext);

  const { Option } = Select;

  const [modalVisible, setModalVisible] = useState(false);
  const [contactoEditado, setContactoEditado] = useState(null);

  const handleEditarContacto = (contacto) => {
    setContactoEditado(contacto);
    setModalVisible(true);
  };

  console.log(roles);

  const handleQuitarContacto = () => {};

  const onFinish = (values) => {
    console.log("Formulario enviado:", values);
  };

  return (
    <>
      <div
        // style={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   alignItems: "flex-start",
        //   userSelect: "none",
        // }}
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
                      onClick={() => handleQuitarContacto()}
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
          onCancel={() => setModalVisible(false)}
          width={500}
          footer={[
            <Button
              key="guardar"
              type="primary"
              htmlType="submit"
              onClick={() => (onFinish(), setModalVisible(false))}
              style={{ borderRadius: "0px" }}
            >
              GUARDAR
            </Button>,
          ]}
          style={{ marginTop: "-50px" }}
        >
          <div style={{ width: "100%", marginLeft: "0px" }}>
            <Form onFinish={onFinish} labelCol={{ span: 24 }}>
              <Form.Item label="Nombre" name="nombre">
                <Input
                  defaultValue={contactoEditado.con_nombre}
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input
                  defaultValue={contactoEditado.con_email1}
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                />
              </Form.Item>

              <Form.Item label="Teléfono" name="telefono">
                <Input
                  defaultValue={contactoEditado.con_telefono1}
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                />
              </Form.Item>

              <Form.Item label="Móvil" name="movil">
                <Input
                  defaultValue={contactoEditado.con_movil1}
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                />
              </Form.Item>

              <Form.Item label="Rol" name="rol">
                <Select
                  style={{
                    marginTop: "-5px",
                    marginBottom: "8px",
                    borderRadius: "0px",
                  }}
                  defaultValue={contactoEditado.rol_desc}
                >
                  {roles.map((rol) => (
                    <Option value={rol.rol_id} key={rol.rol_id}>
                      {rol.rol_desc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ContactosCard;
