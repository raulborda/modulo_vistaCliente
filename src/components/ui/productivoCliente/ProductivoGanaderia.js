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

  const {
    idCliente,
    drawerNewEnc,
    setDrawerNewEnc,
    drawerEditar,
    setDrawerEditar,
    actualizarEncHac,
    actEncHac,
    setActEncHac,
  } = useContext(GlobalContext);

  const [infoHac, setInfoHac] = useState([]);
  const [infoConsumo, setInfoConsumo] = useState(null);
  const [porcentaje, setPorcentaje] = useState(0);

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

  useEffect(() => {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch(`${URL}clientView_traerRealConsumoHacienda.php`, {
      method: "POST",
      body: data,
    }).then(async function (response) {
      await response.text().then((resp) => {
        if (resp) {
          const data = resp;
          const objetoData = JSON.parse(data);
          setInfoConsumo(Number(objetoData[0]?.costo_real));
          // Calculamos los valores numéricos de CR y CE sin el formateo
          let CR = parseFloat(objetoData[0]?.costo_real);
          let CE = parseFloat(infoHac[0]?.cabh_consumoestimado);
          let porcent = ((CR / CE) * 100);
          setPorcentaje(parseInt(Math.round(porcent)));
        }
      });
    });
  }, [actualizarEncHac, actEncHac]);

  // console.log("Info Consumo: ", infoConsumo);
  // console.log("Info Hac: ", infoHac);
  // console.log("Porcentaje: ", porcentaje);

  const displayText = ` (${porcentaje}%)`;

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
    {
      title: "Cons. Est. U$S",
      dataIndex: "consumoUSD",
      key: "consumoUSD",
      align: "center",
    },
  ];

  const dataHac = infoHac.slice(1).map((Enc, index) => ({
    key: Enc.cabh_id,
    fecha: Enc.fecha,
    tambos: parseFloat(Enc.cant_tambosprod).toLocaleString("de-DE"),
    vacasordeñe: parseFloat(Enc.cant_tamboscab).toLocaleString("de-DE"),
    feedlot: parseFloat(Enc.cant_feedlot).toLocaleString("de-DE"),
    invernador: parseFloat(Enc.cant_invernador).toLocaleString("de-DE"),
    cria: parseFloat(Enc.cant_cria).toLocaleString("de-DE"),
    consumoUSD: parseFloat(Enc.cabh_consumoestimado).toLocaleString("de-DE"),
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
        <Button
          type="primary"
          style={{ borderRadius: "0px", fontWeight: "500" }}
          onClick={() => setDrawerNewEnc(true)}
        >
          <PlusOutlined /> CREAR{" "}
        </Button>
        <Button
          type="primary"
          style={{ borderRadius: "0px", marginLeft: "10px", fontWeight: "500" }}
          onClick={() => setDrawerEditar(true)}
        >
          <EditOutlined /> EDITAR{" "}
        </Button>
      </div>
      <div className="card-wrapper">
        <div className="card-contadores">
          <div className="div-secundario">
            <p className="totales">
              {infoHac.length > 0 ? parseFloat(infoHac[0]?.cant_tambosprod).toLocaleString("de-DE") : "-"} 
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
              <p className="totales">
                {infoHac.length > 0 ? parseFloat(infoHac[0]?.cant_tamboscab).toLocaleString("de-DE") : "-"}
              </p>
              <p className="descripcion">VACAS ORDEÑE</p>
            </div>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            <div className="div-secundario">
              <p className="totales">
                {infoHac.length > 0 ? parseFloat(infoHac[0]?.cabh_litros).toLocaleString("de-DE") : "-"}
              </p>
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
            <p className="totales">
              {infoHac.length > 0 ? parseFloat(infoHac[0]?.cant_feedlot).toLocaleString("de-DE") : "-"}
            </p>
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
            <p className="totales">
              {infoHac.length > 0 ? parseFloat(infoHac[0]?.cant_invernador).toLocaleString("de-DE") : "-"}
            </p>
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
            <p className="totales"> 
              {infoHac.length > 0 ? parseFloat(infoHac[0]?.cant_cria).toLocaleString("de-DE") : "-"}
            </p>
            <p className="descripcion">CRIA</p>
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
              <p className="totales">
                {infoHac.length > 0 ? parseFloat(infoHac[0]?.cabh_consumoestimado).toLocaleString("de-DE") : "-"}
              </p>
              <p className="descripcion">CONSUMO ESTIMADO U$S</p>
            </div>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            <div className="div-secundario">
              <div style={{display:"flex", flexDirection:"row", marginLeft:"45px"}}>
                <p className="totales">
                  {infoConsumo > 0 ? parseFloat(infoConsumo).toLocaleString("de-DE") : "-"}
                </p>
                {infoHac.length > 0 &&  infoConsumo > 0 ? (
                  <p className="descripcion" style={{ marginLeft: "10px" }}>
                    {/* {` (${porcentaje}%)`} */}
                    {` (${parseInt(Math.round((parseFloat(infoConsumo)/parseFloat(infoHac[0]?.cabh_consumoestimado))*100))}%)`}
                  </p>
                ): ("0%")}
              </div>
              <p className="descripcion">CONSUMO REAL U$S</p>
            </div>
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
        <NuevaEncHac />
      </Drawer>

      <Drawer
        title="Editar Encuesta Hacienda"
        open={drawerEditar}
        onClose={closeDrawerEditar}
        width={320}
        closeIcon={<CustomCloseIcon />}
      >
        <EditarEncHac editar={infoHac[0]} />
      </Drawer>
    </>
  );
};

//console.log("editar")
