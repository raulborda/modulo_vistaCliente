import React, { useContext } from "react";
import { Card } from "antd";
import { GlobalContext } from "../../context/GlobalContext";

const ContactosCard = () => {
  const { contactosCli } = useContext(GlobalContext);

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
          flexDirection:"column",
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
              title={(contacto.con_nombre).toUpperCase()}
            >
              <p>
                <strong>Email:</strong><label style={{ color: "#56b43c" }}> {contacto.con_email1}</label>
              </p>
              <p>
                <strong>Teléfono:</strong><label style={{ color: "#56b43c" }}> {contacto.con_telefono1}</label>
              </p>
              <p>
                <strong>Móvil:</strong><label style={{ color: "#56b43c" }}> {contacto.con_movil1}</label>
              </p>
              <p>
                <strong>Rol:</strong><label style={{ color: "#56b43c" }}> {contacto.rol_desc}</label>
              </p>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactosCard;
