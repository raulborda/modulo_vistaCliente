/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Divider, Drawer, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./ProducGanaderia.css";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../context/GlobalContext";
import NuevaEncHac from "./NuevaEncHac";
import EditarEncHac from "./EditarEncHac";

export const ProductivoGanaderia = () => {
  const URL = process.env.REACT_APP_URL;

  const { idCliente, drawerNewEnc, setDrawerNewEnc,drawerEditar, setDrawerEditar, actualizarEncHac, actEncHac, setActEncHac} = useContext(GlobalContext);


  const [infoHac, setInfoHac] = useState([]);


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
  }, [actualizarEncHac, actEncHac]);

  // console.log("Encuesta Hacienda: ", infoHac);


  const closeDrawerEditar = () => {
    setDrawerEditar(false);
  };

  const closeDrawerCrear = () => {
    setDrawerNewEnc(false);
  };
  
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

  const closeIconStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
  };


  const CustomCloseIcon = ({ onClick }) => (
    <div style={closeIconStyle} onClick={onClick}>
      X
    </div>
  );

  return (
    <>
    <div className="divBotones">
          <Button type="primary" style={{ borderRadius:"0px", fontWeight:"500" }} onClick={() => setDrawerNewEnc(true)}><PlusOutlined/> CREAR </Button>
          <Button type="primary" style={{ borderRadius:"0px", marginLeft:"10px", fontWeight:"500" }} onClick={() => setDrawerEditar(true)}><EditOutlined/> EDITAR </Button>
    </div>
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
          <div>
            <div className="div-secundario">
              <p className="totales">{ infoHac.length > 0 ?infoHac[0]?.cant_tamboscab : "-"}</p>
              <p className="descripcion">VACAS ORDEÑE</p>
            </div>
            <Divider style={{marginTop:"10px", marginBottom:"10px"}}/>
            <div className="div-secundario">
              <p className="totales">{ infoHac.length > 0 ?infoHac[0]?.cabh_litros : "-"}</p>
              <p className="descripcion">LITROS</p>
            </div>
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

      <Drawer
        title="Nueva Encuesta Hacienda"
        open={drawerNewEnc}
        onClose={closeDrawerCrear}
        width={320}
        closeIcon={<CustomCloseIcon />}
      >
        <NuevaEncHac/>
      </Drawer>

      <Drawer
        title="Editar Encuesta Hacienda"
        open={drawerEditar}
        onClose={closeDrawerEditar}
        width={320}
        closeIcon={<CustomCloseIcon />}
      >
        <EditarEncHac editar={infoHac[0]}/>
      </Drawer>
    </>
  );
};

//console.log("editar")
