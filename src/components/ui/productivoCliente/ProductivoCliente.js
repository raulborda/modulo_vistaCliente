import { Card, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useState } from 'react'
import { ProductivoAgricultura } from './prodAgricultura/ProductivoAgricultura';
// import { ProductivoAgricultura } from './ProductivoAgricultura';
import { ProductivoGanaderia } from './ProductivoGanaderia';

const ProductivoCliente = () => {

  const [itemPesaña, setItemPesaña] = useState(0)

  const items = [
    {
      key: '0',
      label: 'Agricultura',
      component: <ProductivoAgricultura />,
    },
    {
      key: '1',
      label: 'Ganadería',
      component: <ProductivoGanaderia />,
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
        break;
      default:
        setItemPesaña(0);
        break;
    }
  };


  return (
    <>
      <div
        // style={{marginTop: '-13px'}}
      >
        <Tabs
          className="tabs-custom"
          items={items}
          onChange={handleTabClick}
          tabBarStyle={{ width: '100%' }}
        // tabBarGutter={window.innerWidth > 768 ? 40 : 10} // 40px de espacio entre tabs para pantallas mayores a 768px, 10px de espacio para pantallas menores
        >
          {items.map((item) => (
            <TabPane key={item.key} tab={item.label}>
              {item.component}
            </TabPane>
          ))}
        </Tabs>
        {/* <Card> */}
        
          {handleStage()}
        {/* </Card> */}
      </div>
    </>
  )
}

export default ProductivoCliente;