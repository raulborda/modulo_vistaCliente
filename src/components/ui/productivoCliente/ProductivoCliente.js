import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useContext, useState } from 'react'
import './productivoCliente.css';
import { ProductivoAgricultura } from './prodAgricultura/ProductivoAgricultura';
import { ProductivoGanaderia } from './ProductivoGanaderia';
import { GlobalContext } from '../../context/GlobalContext';

const ProductivoCliente = () => {
  const {
    setShowFormAgregar,
    setShowTable,
    setShowEdit,
    setImportarArchivo,
  } = useContext(GlobalContext);

  const [itemPesaña, setItemPesaña] = useState(0)

  const items = [
    {
      key: '0',
      label: 'Agricultura',
    },
    {
      key: '1',
      label: 'Ganadería',
      disabled: true, // Desactiva la pestaña de Ganadería
    },
  ];

  const handleStage = () => {
    switch (itemPesaña) {
      case 0:
        return <ProductivoAgricultura />;
      case 1:
        return <ProductivoGanaderia />;
      default:
        return <ProductivoAgricultura />;
    }
  };

  const handleTabClick = (key) => {
    switch (key) {
      case "0":
        setItemPesaña(0);
        break;
      case "1":
        setItemPesaña(1);

        //*Estos estados son para que se muestre el componente Lotes como cuando se inicia
        setShowFormAgregar(false);
        setImportarArchivo(false);
        setShowTable(false);
        setShowEdit(false);
        //* ----------------------

        break;
      default:
        setItemPesaña(0);
        break;
    }
  };


  return (
    <>
      <div>
        <Tabs
          className="tabs-custom"
          items={items}
          onChange={handleTabClick}
          tabBarStyle={{ width: '100%' }}
        >
          {items.map((item) => (
            <TabPane key={item.key} tab={item.label}>
              {item.component}
            </TabPane>
          ))}
        </Tabs>
        {handleStage()}
      </div>
    </>
  )
}

export default ProductivoCliente;