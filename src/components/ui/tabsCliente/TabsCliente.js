/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Card,
  Drawer,
  Modal,
  Select,
  Space,
  Spin,
  Tabs,
  Tag,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./tabsCliente.css";
import ProductivoCliente from "../productivoCliente/ProductivoCliente";
import NegociosCliente from "../negociosCliente/NegociosCliente";
import TareasCliente from "../tareasCliente/TareasCliente";
import NotasCliente from "../notasCliente/NotasCliente";
import FinanzasCliente from "../finanzasCliente/FinanzasCliente";
import {
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import ClienteCard from "./ClienteCard";
import ContactosCard from "./ContactosCard";

const TabsCliente = () => {
  const URL = process.env.REACT_APP_URL;
  //console.log(URL);

  const [isLoading, setIsLoading] = useState(false);

  const {
    appStage,
    setAppStage,
    idCliente,
    setIdCliente,
    selectedAcosDesc,
    setSelectedAcosDesc,
    cosechaAnterior,
    setCosechaAnterior,
    infoCliSelect,
    setInfoCliSelect,
    contactosCli,
    setContactosCli,
    infoCosechas,
    setCosechas,

    listCosechas,
    setListCosechas,
    cosechaA,
    setCosechaA,

    isSelectEditDisabled,
    cosechaSeleccionada,
    setCosechaSeleccionada,
  } = useContext(GlobalContext);

  const handleSelectChange = (value) => {
    setSelectedAcosDesc(value);

    //! INICIO EVOLUCION PRODUCTIVA
    const selectedCosecha = listCosechas.find(
      (cosecha) => cosecha.acos_desc === value
    );

    if (selectedCosecha) {
      const selectedCosechaId = selectedCosecha.acos_id;
      setCosechaSeleccionada(selectedCosechaId);
      console.log("acos_id seleccionado: ", selectedCosechaId);
      // Realiza las operaciones adicionales con el acos_id seleccionado
    }

    // Obtener índice del valor seleccionado
    const selectedIndex = listCosechas.findIndex(
      (cosecha) => cosecha.acos_desc === value
    );

    // Obtener índice del valor seleccionado que le sigue. Es para el año anterior
    if (selectedIndex >= 0) {
      const previousValue = listCosechas[selectedIndex + 1]?.acos_desc || 0;
      setCosechaAnterior(previousValue);
    }
    //! FIN EVOLUCION PRODUCTIVA
  };

  useEffect(() => {
    handleSelectChange(selectedAcosDesc);
  }, []);

  const cargarInfoCli = () => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URL}infoCliSelect.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        //console.log(resp);
        const objetoData = JSON.parse(data);
        setInfoCliSelect(objetoData);
        setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
      });
    });
  };

  const cargarContactosCli = () => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URL}infoContactosCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        //console.log(resp);
        const objetoData = JSON.parse(data);
        setContactosCli(objetoData);
      });
    });
  };

  useEffect(() => {
    if (idCliente) {
      cargarInfoCli();
      cargarContactosCli();
    }
  }, [idCliente]);

  //console.log(contactosCli);

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

  //! DRAWER INFORMCACION
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("top");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e);
  };

  //! DRAWER CONTACTOS
  const [openC, setOpenC] = useState(false);
  const [placementC, setPlacementC] = useState("top");
  const showDrawerC = () => {
    setOpenC(true);
  };
  const onCloseC = () => {
    setOpenC(false);
  };
  const onChangeC = (e) => {
    setPlacementC(e);
  };

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
                color: "#444",
              }}
            >
              {infoCliSelect[0]?.cli_nombre}
            </h1>
            <EyeOutlined
              style={{
                marginLeft: "11px",
                marginTop: "-7px",
                fontSize: "15px",
                color: "#00b33c",
              }}
              onClick={() => showDrawer()}
            />
            <Drawer
              title={infoCliSelect[0]?.cli_nombre}
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
            >
              <div>
                <ClienteCard />
              </div>
            </Drawer>
            <UserOutlined
              style={{
                marginLeft: "10px",
                marginTop: "-10px",
                fontSize: "13px",
                color: "#00b33c",
              }}
              onClick={() => showDrawerC()}
            />
            <Drawer
              title={infoCliSelect[0]?.cli_nombre}
              placement={placementC}
              closable={false}
              onClose={onCloseC}
              open={openC}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  userSelect: "none",
                }}
              >
                {/* <div
                      style={{
                        width: "30%",
                        flexBasis: "30%",
                        border: "1px solid #E8E8E8",
                        borderRadius: "4px",
                        padding: "5px",
                        marginBottom: "5px",
                        marginRight: "5px",
                      }}
                    >
                      <div style={{ display: "inline" }}>
                        <h4>GABRIELA CHIURA</h4>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>Rol:</h4>
                        <p>NEXO</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>Telefono:</h4>
                        <p> (02364-450909)</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>Movil:</h4>
                        <p>02364-450909</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>Email:</h4>
                        <p>pruebaT@gmail.com</p>
                      </div>
                    </div> */}
                  <ContactosCard />
              </div>
            </Drawer>
          </div>
          <div className="divTags">
            <Space size={[0, 8]} wrap>
              <Tag color="orange">IMPORTANTE</Tag>
              <Tag color="cyan">FEEDLOT</Tag>
              <Tag color="green">NUEVO</Tag>
              <Tag color="blue">ZONA NORTE</Tag>
            </Space>
          </div>
        </div>
        <div className="divContainer-Select-Tabs">
          {/* <Space wrap> */}
          <div style={{ paddingRight: "1px" }}>
            <Select
              defaultValue={selectedAcosDesc && selectedAcosDesc}
              style={{
                width: 97,
                paddingRight: "5px",
              }}
              onChange={handleSelectChange}
              disabled={isSelectEditDisabled}
            >
              {listCosechas.length > 0 &&
                listCosechas.map((cosecha) => {
                  return (
                    <Select.Option
                      key={cosecha.acos_desc}
                      value={cosecha.acos_desc}
                    >
                      {cosecha.acos_desc}
                    </Select.Option>
                  );
                })}
            </Select>
          </div>
          <Tabs className="tabs-custom" items={items} onChange={handleTabClick}>
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
