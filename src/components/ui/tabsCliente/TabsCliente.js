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
import { EyeOutlined, UserOutlined, PaperClipOutlined } from "@ant-design/icons";
import ClienteCard from "./ClienteCard";
import ContactosCard from "./ContactosCard";
// import AdminEtiqueta from "../etiquetasCliente/AdminEtiqueta";
import { Empty } from "antd/es";
import { Tag } from "../../utils/CardBrightness";
import ScoringCliente from "../scoringCliente/ScoringCliente";
import axios from 'axios';


const TabsCliente = () => {
  const URL = process.env.REACT_APP_URL;
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URLDrawer = `${PROTOCOL}//${HOSTNAME}:${PORT}`;

  const [drawerUpload, setDrawerUpload] = useState(false);
  const [modori, setModori] = useState(0);
  const [filter, setFilter] = useState(0);
  const [generico, setGenerico] = useState(0);
  // const [cliEnc, setCliEnc] = useState(0);

  const [configPDF, setConfigPDF] = useState(null);

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
    usu
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

  const getConfPDF = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${URL}modulos/getConfPDF.php`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = axios.request(config);

      return await res;
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    const fetchPDFconfig = async () => {
      try {
        const res = await getConfPDF();

        if (Array.isArray(res.data) && res.data.length > 0) {
          setConfigPDF(res.data);
        };

      } catch (error) {
        console.error("Error al obtener el config pdf:", error);
      };
    };
    fetchPDFconfig();
  }, []);

  useEffect(() => {
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
    ...(Array.isArray(configPDF) && configPDF[0]?.name === 'ASCENCION'
      ? [{
        key: "5",
        label: "Scoring",
        component: <ScoringCliente />,
      }]
      : []),
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
      case 5:
        return <ScoringCliente />;
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
      case "5":
        setAppStage(5);
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

  const handleUploadClick = (record) => {
    setDrawerUpload(true);
    setModori(2); // al estar vistaCliente dentro de modulo clientes, usamos modori de moduloClientes.
    setFilter(2); // al estar vistaCliente dentro de modulo clientes, usamos modori de moduloClientes.
    setGenerico(Number(record.cli_id)); // idCliente
  };

  const handleCloseDrawer = () => {
    setDrawerUpload(false);
  };

  const handleMessageFromIframe = (event) => {
    if (event.data === "closeDrawer") {
      handleCloseDrawer();
    }
  };

  // Agrega el event listener para recibir mensajes del iframe
  useEffect(() => {
    window.addEventListener("message", handleMessageFromIframe);

    // Remueve el event listener al desmontar el componente
    return () => {
      window.removeEventListener("message", handleMessageFromIframe);
    };
  }, []);

  // console.log('infoCliSelect[0]?.cli_nombre', infoCliSelect[0])


  return (
    <div className="divContainer" >
      {selectedAcosDesc ? (
        <>
          <div className="divCliente_info">
            <div className="divCliente_content">
              <h1
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Open Sans, sans-serif",
                  color: "#444",
                  margin: 0,
                }}
              >
                {infoCliSelect[0]?.cli_nombre}
              </h1>
              <span className="icons-wrapper">
                <EyeOutlined
                  style={{
                    fontSize: "15px",
                    color: "#00b33c",
                  }}
                  title="Información"
                  onClick={() => showDrawer()}
                />
                <UserOutlined
                  style={{
                    fontSize: "13px",
                    color: "#00b33c",
                  }}
                  title="Contactos"
                  onClick={() => showDrawerC()}
                />
                <PaperClipOutlined
                  style={{
                    fontSize: "13px",
                    color: "#00b33c",
                  }}
                  title="Archivos"
                  onClick={() => handleUploadClick(infoCliSelect[0])}
                />
              </span>
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

                <Tag key={tag.etq_id} hex={tag.etq_color} nombre={tag.etq_nombre.toUpperCase()} />
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

          <div style={{ flex: 1 }}>{handleStage()}</div>
        </>
      ) : (
        <div style={{ marginTop: "10px" }}>
          <Empty description="Hay un problema con el origen de la información." />
        </div>
      )}

      {drawerUpload ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            height: "100%",
          }}
        >
          <iframe
            loading="lazy"
            src={`${URLDrawer}/duoc/file_dos/?drawer=${drawerUpload}&modori_id=${modori}&filter_id=${filter}&usu_id=${usu}&generico_id=${generico}&cli_id=${idCliente}`}
            width={"100%"}
            height={"100%"}
            style={{ border: "none" }}
            title="drawer"
          ></iframe>
        </div>
      ) : null}
    </div>
  );
};

export default TabsCliente;
