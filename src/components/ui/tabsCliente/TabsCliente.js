/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Select, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./tabsCliente.css";
import ProductivoCliente from "../productivoCliente/ProductivoCliente";
import NegociosCliente from "../negociosCliente/NegociosCliente";
import TareasCliente from "../tareasCliente/TareasCliente";
import NotasCliente from "../notasCliente/NotasCliente";
import FinanzasCliente from "../finanzasCliente/FinanzasCliente";
import { EyeOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";
import ClienteCard from "./ClienteCard";
import ContactosCard from "./ContactosCard";
import AdminEtiqueta from "../etiquetasCliente/AdminEtiqueta";
import { Empty } from "antd/es";

const TabsCliente = () => {
  const URL = process.env.REACT_APP_URL;

  const {
    appStage,
    setAppStage,
    idCliente,
    selectedAcosDesc,
    setSelectedAcosDesc,
    setCosechaAnterior,
    infoCliSelect,
    setInfoCliSelect,
    setContactosCli,
    listCosechas,
    isSelectEditDisabled,
    setCosechaSeleccionada,
    etiquetasCli,
    setEtiquetasCli,
    actualizarEtiqueta,
    actualizaCli,
    open,
    setOpen,
    setEditAdminTags,
    setEditCli,
    setRoles,
    actualizaContacto,
    setBtnCrear,
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
    fetch(`${URL}modulos/infoCliSelect.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoCliSelect(objetoData);
      });
    });
  };

  //console.log(infoCliSelect)

  const cargarContactosCli = () => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URL}modulos/infoContactosCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      const { status } = response;
      if (status === 200) {
        response.text().then((resp) => {
          const data = resp;
          const objetoData = JSON.parse(data);
          setContactosCli(objetoData);
        });
      }
    });
  };

  const cargarEtiquetaxCliente = () => {
    const data = new FormData();
    data.append("idCli", idCliente);
    fetch(`${URL}modulos/clientView_etiquetaxcliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setEtiquetasCli(objetoData);
      });
    });
  };

  const traerRoles = () => {
    const data = new FormData();
    fetch(`${URL}modulos/clientView_traerRubros.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setRoles(objetoData);
      });
    });
  };

  useEffect(() => {
    console.log(idCliente);
    if (idCliente) {
      cargarInfoCli();
      cargarContactosCli();
      cargarEtiquetaxCliente();
      traerRoles();
    }
  }, [idCliente, actualizaCli]);

  useEffect(() => {
    cargarContactosCli();
  }, [actualizaContacto]);

  useEffect(() => {
    if (idCliente) {
      cargarEtiquetaxCliente();
    }
  }, [idCliente, actualizarEtiqueta]);

  //console.log(etiquetasCli);

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
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setEditAdminTags(false);
    setEditCli(false);
  };

  //! DRAWER CONTACTOS
  const [openC, setOpenC] = useState(false);
  const showDrawerC = () => {
    setOpenC(true);
  };
  const onCloseC = () => {
    setOpenC(false);
  };

  //! DRAWER Tags
  // const [openTag, setOpenTag] = useState(false);

  // const showDrawerTag = () => {
  //   setOpenTag(true);
  // };
  // const onCloseTag = () => {
  //   setOpenTag(false);
  // };

  return (
    <>
      <div className="divContainer">
        {selectedAcosDesc ? (
          <>
            <div className="divCliente_info">
              <div className="divCliente_content">
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
                    marginTop: "-4px",
                    fontSize: "15px",
                    color: "#00b33c",
                  }}
                  onClick={() => showDrawer()}
                />
                <Drawer
                  title={"INFORMACION CLIENTE"}
                  closable={true}
                  onClose={onClose}
                  open={open}
                  width={450}
                  placement="right"
                >
                  <div>
                    <ClienteCard />
                  </div>
                </Drawer>

                <UserOutlined
                  style={{
                    marginLeft: "10px",
                    marginTop: "-9px",
                    fontSize: "13px",
                    color: "#00b33c",
                  }}
                  onClick={() => showDrawerC()}
                />
                <Drawer
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>CONTACTOS</span>
                      <Button
                        type="primary"
                        className="btnContacto"
                        onClick={() => setBtnCrear(true)}
                      >
                        Crear Contacto
                      </Button>
                    </div>
                  }
                  closable={true}
                  onClose={onCloseC}
                  open={openC}
                  width={400}
                  placement="right"
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      userSelect: "none",
                    }}
                  >
                    <ContactosCard />
                  </div>
                </Drawer>
              </div>

              <div className="selected_tags">
                {etiquetasCli?.map((tag) => (
                  <>
                    <div
                      className="selected_tag"
                      style={{
                        background: tag.etq_color,
                        display: "inline-block",
                      }}
                      key={tag.etq_id}
                    >
                      <span className="etq_name">
                        {tag.etq_nombre.toUpperCase()}
                      </span>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="divContainer-Select-Tabs">
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
              <Tabs
                className="tabs-custom"
                items={items}
                onChange={handleTabClick}
              >
                {items.map((item) => (
                  <TabPane key={item.key} tab={item.label}>
                    {item.component}
                  </TabPane>
                ))}
              </Tabs>
            </div>

            <div style={{ marginTop: "1px" }}>{handleStage()}</div>
          </>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <Empty description="Hay un problema con el origen de la información." />
          </div>
        )}
      </div>
    </>
  );
};

export default TabsCliente;
