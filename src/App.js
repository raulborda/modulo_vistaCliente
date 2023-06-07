import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client } from "./apollo/ApolloClient";
import esES from "antd/lib/locale/es_ES";
import "./App.css";
import { useState } from "react";
import { GlobalContext } from "./components/context/GlobalContext";
import { ViewGeneral } from "./components/ui/ViewGeneral";

function App() {

  const [appStage, setAppStage] = useState(0);
  const [cardSelected, setCardSelected] = useState(0);
  const [selectedAcosDesc, setSelectedAcosDesc] = useState("");
  const [cosechaAnterior, setCosechaAnterior] = useState("");

  const [infoCosechas, setCosechas] = useState([]);

  const [listCosechas, setListCosechas] = useState([]);
  const [cosechaSeleccionada, setCosechaSeleccionada] = useState(null);
  const [cosechaA, setCosechaA] = useState([]);

  const [iconTable, setIconTable] = useState(false);
  const [infoRubros, setInfoRubros] = useState({});
  const [infoCap, setInfoCap] = useState({});
  const [infoEdit, setInfoEdit] = useState({});

  const [infoCliSelect, setInfoCliSelect] = useState([])
  const [contactosCli, setContactosCli] = useState([])

  //* Id de usuario que se obtiene desde local storage
  const idUsu = localStorage.getItem("usuario");
  const [usu, setUsu] = useState(idUsu);
  // const [usu, setUsu] = useState(1);
  //* Id de cliente que se obtine desde local storage
  const idC = localStorage.getItem("cliSelect");
  // const idC = 2; // .153
  // const idC = 2083; //.28
  // const idC = 2049; //.28
  const [idCliente, setIdCliente] = useState(idC);


  //Evolucion Productiva:
  const [update, setUpdate] = useState(false);
  const [infoEvo, setInfoEvo] = useState([]);
  const [dataForChart, setDataForChart] = useState([]);

  const [dataContext, setDataContext] = useState({
    agricultura: "",
      agriculturaA: "",
      ganaderia: "",
      ganaderiaA: "",
      tambo: "",
      tamboA: "",
      mixto: "",
      mixtoA: "",
      cosecha: ""
  });

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
  const [loteId, setLoteId] = useState(0);
  const [isTableUpdated, setIsTableUpdated] = useState(true);
  const [selectedLote, setSelectedLote] = useState(null);
  const [marcarLote, setMarcarLote] = useState(null);
  const [geoJSONModificado, setGeoJSONModificado] = useState([]);
  const [campos, setCampos] = useState();
  const [clientes, setClientes] = useState();
  const [showTable, setShowTable] = useState(false);

  const [c, setC] = useState(false);
  const [tipoMapa, setTipoMapa] = useState(0);
  const [showMapaUbicLote, setShowMapaUbicLote] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [ubicLote, setUbicLote] = useState(false);
  // const [c, setC] = useState(false);
  const [importarArchivo, setImportarArchivo] = useState(false);
  const [agregarLote, setAgregarLote] = useState(false);
  const [coordenadasArchivo, setCoordenadasArchivo] = useState([]);
  const [limpiarStates, setLimpiarStates] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [verCampo, setVerCampo] = useState(false);
  const [selectedCampoGeojson, setSelectedCampoGeojson] = useState(null);


  const [refrescarTable, setRefrescarTable] = useState(false);
  const [refrescarListLotes, setRefrescarListLotes] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonEditDisabled, setIsButtonEditDisabled] = useState(true);
  const [ca, setCA] = useState(0);
  const [isSelectEditDisabled, setIsSelectEditDisabled] = useState(false);
  const [supEncuestadas, setSupEncuestadas] = useState();

  return (
    <GlobalContext.Provider
      value={{

        //usuario
        usu, 
        setUsu,

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
        showTable, setShowTable,
        visible, setVisible,
        infoLotes, setInfoLotes,
        showFormAgregar, setShowFormAgregar,
        campos, setCampos,
        clientes, setClientes,
        valorGeoJSON, 
        setValorGeoJSON,
        loteId, 
        setLoteId,
        isTableUpdated, 
        setIsTableUpdated,
        selectedLote, 
        setSelectedLote,
        c, 
        setC,
        geoJSONModificado, 
        setGeoJSONModificado,
        marcarLote,
        setMarcarLote,
        showMapaUbicLote, 
        setShowMapaUbicLote,
        tipoMapa,
        setTipoMapa,
        showEdit, setShowEdit,
        dataEdit, setDataEdit,
        ubicLote, setUbicLote,
        importarArchivo, setImportarArchivo,
        agregarLote, setAgregarLote,
        coordenadasArchivo, setCoordenadasArchivo,
        limpiarStates, setLimpiarStates,
        spinning, setSpinning,
        verCampo, setVerCampo,
        selectedCampoGeojson, setSelectedCampoGeojson,

        dataContext, setDataContext,
        refrescarTable, setRefrescarTable,
        ca, setCA,
        isButtonEditDisabled, setIsButtonEditDisabled,
        isSelectEditDisabled, setIsSelectEditDisabled,
        isButtonDisabled, setIsButtonDisabled,
        cosechaSeleccionada, setCosechaSeleccionada,
        supEncuestadas, setSupEncuestadas,
        refrescarListLotes, setRefrescarListLotes,
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
          <ViewGeneral />
        </ConfigProvider>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default App;
