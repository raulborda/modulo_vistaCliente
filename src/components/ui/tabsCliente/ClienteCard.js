import React, { useContext, useState } from "react";
import { Card, Divider } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { EditOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import AdminEtiqueta from "../etiquetasCliente/AdminEtiqueta";

const ClienteCard = () => {
  const { infoCliSelect, etiquetasCli } = useContext(GlobalContext);

  const [editAdminTags, setEditAdminTags] = useState(false);
  const [cliFav, setCliFav] = useState(true);

  const editTags = () => {
    setEditAdminTags(!editAdminTags);
  };

  const editFav = () => {
    setCliFav(!cliFav);
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <span style={{ fontWeight: "600" }}>
          {infoCliSelect[0]?.cli_nombre}
        </span>
        {cliFav ? (
          <HeartFilled
            style={{ float: "right", color: "red", marginTop: "0.5px" }}
            onClick={() => editFav()}
          />
        ) : (
          <HeartOutlined
            style={{ float: "right", color: "red", marginTop: "0.5px" }}
            onClick={() => editFav()}
          />
        )}
      </div>

      <div>
        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">Cuenta:</label>
          <label>
            {" "}
            {infoCliSelect[0]?.cli_idsistema
              ? infoCliSelect[0]?.cli_idsistema
              : "-"}
          </label>
        </p>

        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">Teléfono:</label>
          <label>
            {" "}
            {infoCliSelect[0]?.cli_telefono1
              ? infoCliSelect[0]?.cli_telefono1
              : "-"}
          </label>
        </p>

        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">Correo Electrónico:</label>
          <label>
            {" "}
            {infoCliSelect[0]?.cli_email1 ? infoCliSelect[0]?.cli_email1 : "-"}
          </label>
        </p>

        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">CUIT:</label>
          <label>
            {" "}
            {infoCliSelect[0]?.cli_cuit ? infoCliSelect[0]?.cli_cuit : "-"}
          </label>
        </p>

        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">Segmento:</label>
          <label>
            {infoCliSelect[0]?.seg_id ? infoCliSelect[0]?.seg_id : "-"}
          </label>
        </p>

        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">Tamaño:</label>
          <label>
            {infoCliSelect[0]?.tam_desc ? infoCliSelect[0]?.tam_desc : "-"}
          </label>
        </p>

        <p style={{ marginBottom: "5px" }}>
          <label className="fontWeightLabel">Sector:</label>
          <lebel>
            {infoCliSelect[0]?.tag_desc ? infoCliSelect[0]?.tag_desc : "-"}
          </lebel>
        </p>
      </div>

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
