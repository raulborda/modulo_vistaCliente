/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import TabsCliente from "./tabsCliente/TabsCliente";
import { GlobalContext } from "../context/GlobalContext";

export const ViewGeneral = () => {
  const URL = process.env.REACT_APP_URL;

  const {
    selectedAcosDesc,
    setSelectedAcosDesc,
    setCosechaAnterior,
    idCliente,
    setCosechas,
    setListCosechas,
    setCosechaA,
    setCosechaSeleccionada,
  } = useContext(GlobalContext);

  //! /*-------- INICIO - CONSULTAS PARA TRAER LOS DATOS---------*/
  // //* FUNCION QUE TRAE LOS DATOS DE COSECHA ACTIVA Y LAS QUE SE PUEDEN VISUALIZAR DEL CLIENTE
  function cosechas(idCliente) {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch(`${URL}modulos/com_traerCosechas.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        if (resp) {
          const data = resp;
          const objetoData = JSON.parse(data);
          setCosechas(objetoData);
          setCosechaA(objetoData[0].acos_desc);
          setListCosechas(objetoData);
          setCosechaSeleccionada(
            objetoData.length > 0 ? objetoData[0]?.acos_id : null
          );
          setSelectedAcosDesc(
            objetoData.length > 0 ? objetoData[0]?.acos_desc : null
          );
          setCosechaAnterior(
            objetoData.length > 0 ? objetoData[1]?.acos_desc : null
          );
        }
      });
    });
  }

  useEffect(() => {
    if (idCliente) {
      cosechas(idCliente);
    }
  }, [idCliente]);
  //! /*-------- FIN - CONSULTAS PARA TRAER LOS DATOS EVOLUCION PRODUCTIVA---------*/

  return <TabsCliente />;
};
