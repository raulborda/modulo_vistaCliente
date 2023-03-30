/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Modal, Select, Space, Tabs, Tag } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./tabsCliente.css";
import ProductivoCliente from "../productivoCliente/ProductivoCliente";
import NegociosCliente from "../negociosCliente/NegociosCliente";
import TareasCliente from "../tareasCliente/TareasCliente";
import NotasCliente from "../notasCliente/NotasCliente";
import FinanzasCliente from "../finanzasCliente/FinanzasCliente";
import { EyeOutlined } from "@ant-design/icons";

const TabsCliente = () => {
  const { appStage, setAppStage } = useContext(GlobalContext);

  const items = [
    {
      key: "0",
      label: "Productivo",
      component: <ProductivoCliente />,
    },
    {
      key: "1",
      label: "Negocios",
      component: <NegociosCliente />,
    },
    {
      key: "2",
      label: "Tareas",
      component: <TareasCliente />,
    },
    {
      key: "3",
      label: "Notas",
      component: <NotasCliente />,
    },
    {
      key: "4",
      label: "Finanzas",
      component: <FinanzasCliente />,
    },
  ];

  const handleStage = () => {
    switch (appStage) {
      case 0:
        return <ProductivoCliente />;
      case 1:
        return <NegociosCliente />;
      case 2:
        return <TareasCliente />;
      case 3:
        return <NotasCliente />;
      case 4:
        return <FinanzasCliente />;
      default:
        return <ProductivoCliente />;
    }
  };

  const handleTabClick = (key) => {
    switch (key) {
      case "0":
        setAppStage(0);
        break;
      case "1":
        setAppStage(1);
        break;
      case "2":
        setAppStage(2);
        break;
      case "3":
        setAppStage(3);
        break;
      case "4":
        setAppStage(4);
        break;
      default:
        setAppStage(0);
        break;
    }
  };

  const handleChangee = (value) => {
    console.log(`selected ${value}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const itemsDomicilio = [
    {
      key: "0",
      label: "Domicilio 1",
      // component: <ProductivoCliente />,
    },
    {
      key: "1",
      label: "Domicilio 2",
      // component: <NegociosCliente />,
    },
  ];

  return (
    <>
      <div
        className="divContainer"
        // style={{marginBottom: '-100px' }}
      >
        <div className="divCliente_content">
          <div className="divCliente_info">
            <h1
              style={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Open Sans, sans-serif",
                marginBottom: "10px",
              }}
            >
              ACONCAGUA S.R.L
            </h1>
            <EyeOutlined
              style={{
                marginLeft: "10px",
                marginTop: "3px",
                fontSize: "15px",
                color: "#00b33c",
              }}
              onClick={showModal}
            />
            <Modal
              title="INFORMACIÓN CLIENTE"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
              height={800}
              footer={null}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  width: "100%",
                  // border: "1px solid red",
                }}
              >
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    width: "100%",
                    border: "1px solid #E8E8E8",
                    borderRadius:"4px",
                  }}
                > */}
                  <div
                    style={{
                      marginRight:"5px",
                      height: "100%",
                      width: "50%",
                      border: "1px solid #E8E8E8",
                      borderRadius:"4px",
                      padding:"5px"
                    }}
                  >
                    <p>1</p>
                    <div>
                      <p>02364-450909</p>
                    </div>
                    <div>
                      <p>contacto@aconcagua.com.ar</p>
                    </div>
                    <div>
                      <p>Segmento:</p>
                    </div>
                    <p>Sector:</p>
                    <p>COMERCIO</p>
                    <p>Tamaño:</p>
                    <p>PEQUEÑO</p>
                  </div>
                  {/* <div style={{ height: '100%', width: '100%', border: '1px solid blue' }}>
                                        <p>CONTACTOS</p>
                                    </div> */}
                {/* </div> */}
                <div
                  style={{
                    height: "auto",
                    width: "50%",
                    border: "1px solid #E8E8E8",
                    borderRadius:"4px",
                  }}
                >
                  <Tabs
                    className="tabs-custom"
                    items={itemsDomicilio}
                    // onChange={handleTabClick}
                    // tabBarStyle={{ width: '100%' }}
                    // tabBarGutter={window.innerWidth > 768 ? 40 : 10} // 40px de espacio entre tabs para pantallas mayores a 768px, 10px de espacio para pantallas menores
                  >
                    {items.map((item) => (
                      <TabPane key={item.key} tab={item.label}>
                        {item.component}
                      </TabPane>
                    ))}
                  </Tabs>
                </div>
              </div>
            </Modal>
          </div>
          <div className="divTags">
            {/* <a href='#' className='tags'>IMPORTANTE</a>
                        <a href='#' className='tags'>FEEDLOT</a>
                        <a href='#' className='tags'>NUEVO</a>
                        <a href='#' className='tags'>ZONA NORTE</a> */}
            <Space size={[0, 8]} wrap>
              <Tag color="#f50">IMPORTANTE</Tag>
              <Tag color="#2db7f5">FEEDLOT</Tag>
              <Tag color="#87d068">NUEVO</Tag>
              <Tag color="#108ee9">ZONA NORTE</Tag>
            </Space>
          </div>
        </div>
        <div className="divContainer-Select-Tabs">
          {/* <Space wrap> */}
          <div style={{ paddingRight: "1px" }}>
            <Select
              defaultValue="2324"
              style={{
                width: 97,
                paddingRight: "5px",
              }}
              onChange={handleChangee}
              options={[
                {
                  value: "2324",
                  label: "2324",
                },
                {
                  value: "2223",
                  label: "2223",
                },
                {
                  value: "2122",
                  label: "2122",
                },
                {
                  value: "2021",
                  label: "2021",
                },
              ]}
            />
          </div>
          <Tabs
            className="tabs-custom"
            items={items}
            onChange={handleTabClick}
            // tabBarStyle={{ width: '100%' }}
            // tabBarGutter={window.innerWidth > 768 ? 40 : 10} // 40px de espacio entre tabs para pantallas mayores a 768px, 10px de espacio para pantallas menores
          >
            {items.map((item) => (
              <TabPane key={item.key} tab={item.label}>
                {item.component}
              </TabPane>
            ))}
          </Tabs>
        </div>
        <div style={{ marginTop: "1px" }}>{handleStage()}</div>
      </div>
    </>
  );
};

export default TabsCliente;
