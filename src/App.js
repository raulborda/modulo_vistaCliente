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

  return (
    // <>
    //   <p>HOLA</p>
    // </>
    <GlobalContext.Provider 
      value={{
        appStage, setAppStage,
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
