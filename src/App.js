import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { client } from "./apollo/ApolloClient";
import esES from "antd/lib/locale/es_ES";
import './App.css';
import { useState } from 'react';
import { GlobalContext } from './components/context/GlobalContext';
import TabsCliente from './components/ui/tabsCliente/TabsCliente';

function App() {

  const [appStage, setAppStage] = useState(0);
  const [cardSelected, setCardSelected ] = useState(0);
  // const [tipoGrafico, settipoGrafico] = useState();

  return (

    <GlobalContext.Provider 
      value={{
        appStage, setAppStage,
        cardSelected, setCardSelected,
        // tipoGrafico, settipoGrafico,
      }}
    >
      <ApolloProvider client={client}>
        {/* <ConfigProvider locale={esES}> */}
            <TabsCliente />
        {/* </ConfigProvider> */}
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default App;
