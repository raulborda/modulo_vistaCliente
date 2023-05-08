import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client } from "./apollo/ApolloClient";
import esES from "antd/lib/locale/es_ES";
import "./App.css";
import { useEffect, useState } from "react";
import { GlobalContext } from "./components/context/GlobalContext";
import TabsCliente from "./components/ui/tabsCliente/TabsCliente";
import { ViewGeneral } from "./components/ui/ViewGeneral";
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function App() {


  // mapboxgl.accessToken = 'pk.eyJ1IjoianVsaXBlcmVsZGEiLCJhIjoiY2xnZ2lqZTR0MDVxMDNjbzY3ZmkyeTg4ZSJ9.tuTXT_-exIErerEPFT9o3g';
  // mapboxgl.accessToken = 'pk.eyJ1IjoianVsaXBlcmVsZGEiLCJhIjoiY2xnZ2lqZTR0MDVxMDNjbzY3ZmkyeTg4ZSJ9.tuTXT_-exIErerEPFT9o3g';

  const [appStage, setAppStage] = useState(0);
  const [cardSelected, setCardSelected] = useState(0);
  const [selectedAcosDesc, setSelectedAcosDesc] = useState("");
  const [cosechaAnterior, setCosechaAnterior] = useState("");

  const [infoCosechas, setCosechas] = useState([]);

  const [listCosechas, setListCosechas] = useState([]);
  const [cosechaA, setCosechaA] = useState([]);

  const [iconTable, setIconTable] = useState(false);
  const [infoRubros, setInfoRubros] = useState({});
  const [infoCap, setInfoCap] = useState({});
  const [infoEdit, setInfoEdit] = useState({});

  //* Id de cliente que se obtine desde local storage
  // const idC = localStorage.getItem("cliente");
  //const idC = localStorage.getItem("cliente");
  //const idC = 2773;
  const [idCliente, setIdCliente] = useState(2773);

  //Evolucion Productiva:
  const [update, setUpdate] = useState(false);
  const [infoEvo, setInfoEvo] = useState([]);
  const [dataForChart, setDataForChart] = useState([]);

  //GraficoCerealEntregado
  const [infoTotal, setInfoTotal] = useState({});
  const [infoSoja, setInfoSoja] = useState({});
  const [infoTrigo, setInfoTrigo] = useState({});
  const [infoMaiz, setInfoMaiz] = useState({});
  const [infoOtrosGranos, setInfoOtrosGranos] = useState({});

  //AnalisisInsumosComprados
  const [infoInsumoTotal, setInfoInsumoTotal] = useState([]);
  const [infoInsumoAgroquimicos, setInfoInsumoAgroquimicos] = useState({});
  const [infoInsumoSemillas, setInfoInsumoSemillas] = useState({});
  const [infoInsumoFertilizantes, setInfoInsumoFertilizantes] = useState({});
  const [isDataInsumoTotal, setIsDataInsumoTotal] = useState([]);
  const [isDataInsumoAgroquimicos, setIsDataInsumoAgroquimicos] = useState([]);
  const [isDataInsumoSemillas, setIsDataInsumoSemillas] = useState([]);
  const [isDataInsumoFertilizantes, setIsDataInsumoFertilizantes] = useState(
    []
  );
  const [isDataTotal, setIsDataTotal] = useState([]);
  const [isDataSoja, setIsDataSoja] = useState([]);
  const [isDataTrigo, setIsDataTrigo] = useState([]);
  const [isDataMaiz, setIsDataMaiz] = useState([]);
  const [isDataOtrosGranos, setIsDataOtrosGranos] = useState([]);

  //Ver lotes
  const [visible, setVisible] = useState(false);
  const [infoLotes, setInfoLotes] = useState([]);
  const [showFormAgregar, setShowFormAgregar] = useState(false);
  const [valorGeoJSON, setValorGeoJSON] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
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

        iconTable,
        setIconTable,
        infoRubros,
        setInfoRubros,
        infoCap,
        setInfoCap,
        infoEdit,
        setInfoEdit,

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

        //Ver lotes
        visible, setVisible,
        infoLotes, setInfoLotes,
        showFormAgregar, setShowFormAgregar,
        visible,
        setVisible,
        infoLotes,
        setInfoLotes,

        valorGeoJSON, 
        setValorGeoJSON,
      }}
    >
      <ApolloProvider client={client}>
        <ConfigProvider
          locale={esES}
          theme={{
            token: {
              colorPrimary: "#56b43c",
            },
          }}
        >
          {/* <TabsCliente /> */}
          <ViewGeneral />
        </ConfigProvider>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default App;
