import React, { useContext } from "react";
import { Card } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { HeartFilled } from "@ant-design/icons";

const ClienteCard = () => {
  const { infoCliSelect } = useContext(GlobalContext);

  return (
    <Card
     title={
        <div>
          Información del Cliente
          <HeartFilled style={{ float: "right", color: "red", marginTop:"2.5px" }} />
        </div>
      }
      style={{ width: 400 }}
      headStyle={{ textAlign: "center" }}
    >
      <p>
        <strong>ID del Sistema:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.cli_idsistema
            ? infoCliSelect[0]?.cli_idsistema
            : "-"}
        </label>
      </p>
      <p>
        <strong>Teléfono:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.cli_telefono1
            ? infoCliSelect[0]?.cli_telefono1
            : "-"}
        </label>
      </p>
      <p>
        <strong>Correo Electrónico:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.cli_email1 ? infoCliSelect[0]?.cli_email1 : "-"}
        </label>
      </p>
      <p>
        <strong>CUIT:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.cli_cuit ? infoCliSelect[0]?.cli_cuit : "-"}
        </label>
      </p>
      <p>
        <strong>Segmento:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.seg_id ? infoCliSelect[0]?.seg_id : "-"}
        </label>
      </p>
      <p>
        <strong>Tamaño:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.tam_desc ? infoCliSelect[0]?.tam_desc : "-"}
        </label>
      </p>
      <p>
        <strong>Sector:</strong>
        <label style={{ color: "#56b43c" }}>
          {" "}
          {infoCliSelect[0]?.tag_desc ? infoCliSelect[0]?.tag_desc : "-"}
        </label>
      </p>
    </Card>
  );
};

export default ClienteCard;
