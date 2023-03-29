import { Card, Select, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import './tabsCliente.css';
import ProductivoCliente from "../productivoCliente/ProductivoCliente";
import NegociosCliente from "../negociosCliente/NegociosCliente";
import TareasCliente from "../tareasCliente/TareasCliente";
import NotasCliente from "../notasCliente/NotasCliente";
import FinanzasCliente from "../finanzasCliente/FinanzasCliente";


const TabsCliente = () => {

    const {
        appStage, setAppStage,
    } = useContext(GlobalContext)


    const items = [
        {
            key: '0',
            label: 'Productivo',
            component: <ProductivoCliente />,
        },
        {
            key: '1',
            label: 'Negocios',
            component: <NegociosCliente />,
        },
        {
            key: '2',
            label: 'Tareas',
            component: <TareasCliente />,
        },
        {
            key: '3',
            label: 'Notas',
            component: <NotasCliente />,
        },
        {
            key: '4',
            label: 'Finanzas',
            component: <FinanzasCliente />,
        },
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
            default:
                setAppStage(0);
                break;
        }
    };

    const handleChangee = (value) => {
        console.log(`selected ${value}`);
    };


    return (
        <>
            <div
                className="divContainer"
            // style={{marginBottom: '-100px' }}
            >
                <div className="divContainer-Select-Tabs">
                    {/* <Space wrap> */}
                    <div style={{paddingRight: '1px'}}>
                        <Select
                            defaultValue="2324"
                            style={{
                                width: 97,
                                paddingRight: '5px'
                            }}
                            onChange={handleChangee}
                            options={[
                                {
                                    value: '2324',
                                    label: '2324',
                                },
                                {
                                    value: '2223',
                                    label: '2223',
                                },
                                {
                                    value: '2122',
                                    label: '2122',
                                },
                                {
                                    value: '2021',
                                    label: '2021',
                                },
                            ]}
                        />
                    </div>
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
                </div>
                {handleStage()}
            </div>
        </>
    )
}

export default TabsCliente;