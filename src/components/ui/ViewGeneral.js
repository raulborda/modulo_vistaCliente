import React, { useContext, useEffect, useState } from "react";
import TabsCliente from "./tabsCliente/TabsCliente";
import { GlobalContext } from "../context/GlobalContext";

export const ViewGeneral = () => {
  const URL = process.env.REACT_APP_URL;

  const {
    appStage,
    setAppStage,
    cardSelected,
    setCardSelected,
    selectedAcosDesc,
    setSelectedAcosDesc,
    cosechaAnterior,
    setCosechaAnterior,
    idCliente,
    setIdCliente,
    infoCosechas,
    setCosechas,

    listCosechas,
    setListCosechas,
    cosechaA,
    setCosechaA,

    infoEvo,
    setInfoEvo,
    update,
    setUpdate,
    dataForChart,
    setDataForChart,

    //GraficoCerealEntregado
    infoTotal,
    setInfoTotal,
    infoSoja,
    setInfoSoja,
    infoTrigo,
    setInfoTrigo,
    infoMaiz,
    setInfoMaiz,
    infoOtrosGranos,
    setInfoOtrosGranos,
    isDataTotal,
    setIsDataTotal,
    isDataSoja,
    setIsDataSoja,
    isDataTrigo,
    setIsDataTrigo,
    isDataMaiz,
    setIsDataMaiz,
    isDataOtrosGranos,
    setIsDataOtrosGranos,

    //AnalisisInsumosComprados
    infoInsumoTotal,
    setInfoInsumoTotal,
    infoInsumoAgroquimicos,
    setInfoInsumoAgroquimicos,
    infoInsumoSemillas,
    setInfoInsumoSemillas,
    infoInsumoFertilizantes,
    setInfoInsumoFertilizantes,
    isDataInsumoTotal,
    setIsDataInsumoTotal,
    isDataInsumoAgroquimicos,
    setIsDataInsumoAgroquimicos,
    isDataInsumoSemillas,
    setIsDataInsumoSemillas,
    isDataInsumoFertilizantes,
    setIsDataInsumoFertilizantes,
    setCosechaSeleccionada,
  } = useContext(GlobalContext);

  // const [selectedAcosDesc1, setSelectedAcosDesc1] = useState('');

  //! /*-------- INICIO - CONSULTAS PARA TRAER LOS DATOS---------*/
  // //* FUNCION QUE TRAE LOS DATOS DE COSECHA ACTIVA Y LAS QUE SE PUEDEN VISUALIZAR DEL CLIENTE
  function cosechas(idCliente) {
    const data = new FormData();
    data.append("idC", idCliente);
    // fetch("../com_traerCosechas.php", {
    fetch(`${URL}com_traerCosechas.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setCosechas(objetoData);
        setCosechaA(objetoData[0].acos_desc);
        setListCosechas(objetoData);
        // console.log('listCosechas: ', listCosechas)

        setCosechaSeleccionada(objetoData.length > 0 ? objetoData[0]?.acos_id : null);
        setSelectedAcosDesc(
          objetoData.length > 0 ? objetoData[0]?.acos_desc : null
        );
        setCosechaAnterior(
          objetoData.length > 0 ? objetoData[1]?.acos_desc : null
        );
      });
    });
  }
  // console.log('listCosechas1: ', listCosechas)
  useEffect(() => {
    cosechas(idCliente); //! PREGUNTAR PORQUE SE LE PASA ID CLIENTE A JULI
    // console.log('objetoData: ', objetoData)
  }, []);

  useEffect(() => {
    if (idCliente) {
      cosechas(idCliente);
      //   setSelectedAcosDescPrueba(listCosechas.length > 0 ? listCosechas[0]?.acos_desc : null);
      //   setCosechaAnteriorPrueba(listCosechas.length > 0 ? listCosechas[1]?.acos_desc : null);
    }
  }, [idCliente /*, cosecha, update, selectedValue, cosechaActiva*/]);
  //! /*-------- FIN - CONSULTAS PARA TRAER LOS DATOS EVOLUCION PRODUCTIVA---------*/

  //   console.log('setSelectedAcosDesc - viewGeneral: ', selectedAcosDesc);
  //   //console.log('setSelectedAcosDesc1 - viewGeneral: ', selectedAcosDesc1);
  //   console.log('setCosechaAnterior - viewGeneral: ', cosechaAnterior);
  return (
    <>
      {selectedAcosDesc && <TabsCliente />}
      {/* { selectedAcosDesc && selectedAcosDesc1 && cosechaAnterior && <TabsCliente selectedAcosDescP={selectedAcosDesc1} />} */}
    </>
  );
};
