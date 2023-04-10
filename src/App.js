import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { client } from "./apollo/ApolloClient";
import esES from "antd/lib/locale/es_ES";
import './App.css';
import { useState } from 'react';
import { GlobalContext } from './components/context/GlobalContext';
import TabsCliente from './components/ui/tabsCliente/TabsCliente';
import { ViewGeneral } from './components/ui/ViewGeneral';

function App() {

  const [appStage, setAppStage] = useState(0);
  const [cardSelected, setCardSelected] = useState(0);
  const [selectedAcosDesc, setSelectedAcosDesc] = useState('');
  const [cosechaAnterior, setCosechaAnterior] = useState('');

  const [infoCosechas, setCosechas] = useState([]);


  const [listCosechas, setListCosechas] = useState([])
  const [cosechaA, setCosechaA] = useState([])

  //* Id de cliente que se obtine desde local storage
  // const idC = localStorage.getItem("cliente");
  const idC = localStorage.getItem("2049");
  const [idCliente, setIdCliente] = useState(idC);


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
  const [isDataInsumoFertilizantes, setIsDataInsumoFertilizantes] = useState([]);
  const [isDataTotal, setIsDataTotal] = useState([]);
  const [isDataSoja, setIsDataSoja] = useState([]);
  const [isDataTrigo, setIsDataTrigo] = useState([]);
  const [isDataMaiz, setIsDataMaiz] = useState([]);
  const [isDataOtrosGranos, setIsDataOtrosGranos] = useState([]);

  return (

    <GlobalContext.Provider
      value={{
        appStage, setAppStage,
        cardSelected, setCardSelected,
        selectedAcosDesc, setSelectedAcosDesc,
        cosechaAnterior, setCosechaAnterior,
        idCliente, setIdCliente,
        infoCosechas, setCosechas,

        listCosechas, setListCosechas,
        cosechaA, setCosechaA,

        infoEvo, setInfoEvo,
        update, setUpdate,
        dataForChart, setDataForChart,


        //GraficoCerealEntregado
        infoTotal, setInfoTotal,
        infoSoja, setInfoSoja,
        infoTrigo, setInfoTrigo,
        infoMaiz, setInfoMaiz,
        infoOtrosGranos, setInfoOtrosGranos,
        isDataTotal, setIsDataTotal,
        isDataSoja, setIsDataSoja,
        isDataTrigo, setIsDataTrigo,
        isDataMaiz, setIsDataMaiz,
        isDataOtrosGranos, setIsDataOtrosGranos,

        //AnalisisInsumosComprados
        infoInsumoTotal, setInfoInsumoTotal,
        infoInsumoAgroquimicos, setInfoInsumoAgroquimicos,
        infoInsumoSemillas, setInfoInsumoSemillas,
        infoInsumoFertilizantes, setInfoInsumoFertilizantes,
        isDataInsumoTotal, setIsDataInsumoTotal,
        isDataInsumoAgroquimicos, setIsDataInsumoAgroquimicos,
        isDataInsumoSemillas, setIsDataInsumoSemillas,
        isDataInsumoFertilizantes, setIsDataInsumoFertilizantes,
      }}
    >

      <ApolloProvider client={client}>
        {/* <ConfigProvider locale={esES}> */}
        {/* <TabsCliente /> */}
        <ViewGeneral/>
        {/* </ConfigProvider> */}
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default App;
