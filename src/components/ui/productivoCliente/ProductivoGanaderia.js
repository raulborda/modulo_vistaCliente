import { Card, Divider, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./ProducGanaderia.css";
import { EditOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../context/GlobalContext";

export const ProductivoGanaderia = () => {
  const URL = process.env.REACT_APP_URL;

  //const [editarInfo, setEditarInfo] = useState(0);
  const [infoHac, setInfoHac] = useState([]);

  const { idCliente } = useContext(GlobalContext);

  useEffect(() => {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch(`${URL}clientView_traerEncHacienda.php`, {
      method: "POST",
      body: data,
    }).then(async function (response) {
      await response.text().then((resp) => {
        if (resp) {
          const data = resp;
          const objetoData = JSON.parse(data);
          setInfoHac(objetoData);
        }
      });
    });
  }, []);

  console.log("Encuesta Hacienda: ", infoHac);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      align: "center",
    },
    {
      title: "Tambos",
      dataIndex: "tambos",
      key: "tambos",
      align: "center",
    },
    {
      title: "Vacas Ordeñe",
      dataIndex: "vacasordeñe",
      key: "vacasordeñe",
      align: "center",
    },
    {
      title: "Feedlot",
      dataIndex: "feedlot",
      key: "feedlot",
      align: "center",
    },
    {
      title: "Invernador",
      dataIndex: "invernador",
      key: "invernador",
      align: "center",
    },
    {
      title: "Cria",
      dataIndex: "cria",
      key: "cria",
      align: "center",
    },
  ];

  const dataHac = infoHac.slice(1).map((Enc, index) => ({
    key: Enc.cabh_id,
    fecha: Enc.fecha,
    tambos: Enc.cant_tambosprod,
    vacasordeñe: Enc.cant_tamboscab,
    feedlot: Enc.cant_feedlot,
    invernador: Enc.cant_invernador,
    cria: Enc.cant_cria,
  }));

  return (
    <>
      <div className="card-wrapper">
        <div className="card-contadores">
          <div className="div-secundario">
            <p className="totales">
              {infoHac.length > 0 ? infoHac[0]?.cant_tambosprod : "-"}
            </p>
            <p className="descripcion">TAMBOS</p>
          </div>
          <Divider
            type="vertical"
            style={{
              height: "100%",
              borderColor: "#f0f0f0",
              borderWidth: "2px",
            }}
          />
          <div className="div-secundario">
            <p className="totales">{ infoHac.length > 0 ?infoHac[0]?.cant_tamboscab : "-"}</p>
            <p className="descripcion">VACAS ORDEÑE</p>
          </div>
          <Divider
            type="vertical"
            style={{
              height: "100%",
              borderColor: "#f0f0f0",
              borderWidth: "2px",
            }}
          />
          <div className="div-secundario">
            <p className="totales">{infoHac.length > 0 ? infoHac[0]?.cant_feedlot : "-"}</p>
            <p className="descripcion">FEEDLOT</p>
          </div>
          <Divider
            type="vertical"
            style={{
              height: "100%",
              borderColor: "#f0f0f0",
              borderWidth: "2px",
            }}
          />
          <div className="div-secundario">
            <p className="totales">{infoHac.length > 0 ? infoHac[0]?.cant_invernador : "-"}</p>
            <p className="descripcion">INVERNADOR</p>
          </div>
          <Divider
            type="vertical"
            style={{
              height: "100%",
              borderColor: "#f0f0f0",
              borderWidth: "2px",
            }}
          />
          <div className="div-secundario">
            <p className="totales">{infoHac.length > 0 ? infoHac[0]?.cant_cria : "-"}</p>
            <p className="descripcion">CRIA</p>
          </div>
        </div>

        <div className="div-editar">
          <EditOutlined
            style={{ color: "#56b43c" }}
            onClick={() => console.log("Editar Hacienda")}
          />
        </div>
      </div>
      <Table
        rowKey={"neg_id"}
        size={"small"}
        dataSource={dataHac}
        columns={columns}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
      />
    </>
  );
};

//console.log("editar")
