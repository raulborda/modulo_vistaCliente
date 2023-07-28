import { Card, Divider, Table } from "antd";
import React, { useState } from "react";
import "./ProducGanaderia.css";
import { EditOutlined } from "@ant-design/icons";

export const ProductivoGanaderia = () => {
  const [editarInfo, setEditarInfo] = useState(0);







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
    }
  ]

  const dataHac = [
    {
      key: 1,
      fecha: '29/07/2023',
      tambos: 12,
      vacasordeñe: 600,
      feedlot: 10,
      invernador: 20,
      cria: 30,
    },
    
  ];
  

  return (
    <>
      <div className="card-wrapper">
        <div className="card-contadores">
          <div className="div-secundario">
            <p className="totales">12</p>
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
          <div className="div-secundario" >
            <p className="totales">600</p>
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
          <div className="div-secundario" >
            <p className="totales">10</p>
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
            <p className="totales">20</p>
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
          <div className="div-secundario" style={{ cursor: "pointer" }}>
            <p className="totales">10</p>
            <p className="descripcion">CRIA</p>
          </div>
        </div>
        {editarInfo === 0 ? (
          <div className="div-editar">
              <EditOutlined style={{color:"#56b43c"}} onClick={() => console.log("Editar Hacienda")}/>
          </div>
        )  : <></>}
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