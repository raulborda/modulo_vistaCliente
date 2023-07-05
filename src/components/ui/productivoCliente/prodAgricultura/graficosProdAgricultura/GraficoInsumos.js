import React, { useContext, useEffect, useState } from 'react'
import { Bar, CartesianGrid, ComposedChart, LabelList, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlobalContext } from '../../../../context/GlobalContext';
import { Spin, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import "./graficos.css";
import { format } from 'd3-format';

export const GraficoInsumos = () => {

    const {
        isDataInsumoTotal,
        isDataInsumoAgroquimicos,
        isDataInsumoSemillas,
        isDataInsumoFertilizantes,
    } = useContext(GlobalContext);

    const [isValorCompra, setIsValorCompra] = useState(true);
    const [isValorEstimado, setIsValorEstimado] = useState(true);

    const items = [
        {
            key: '1',
            label: `Total`,
            children: `TOTAL 1`,
        },
        {
            key: '2',
            label: `Agroquímicos`,
            children: `AGROQUIMICOS 2`,
        },
        {
            key: '3',
            label: `Semillas`,
            children: `SEMILLAS 3`,
        },
        {
            key: '4',
            label: `Fertilizantes`,
            children: `FERTILIZANTES 4`,
        },
    ];
    const [activeKey, setActiveKey] = useState(items[0].key);
    const [isLoading, setIsLoading] = useState(1);

    const handleChangeTab = (key) => {
        setActiveKey(key)
        setIsLoading(1)
    }

    useEffect(() => {
        if (isLoading > 0) {
            setTimeout(() => {
                setIsLoading(isLoading - 1);
            }, 1000);
        } else {
            setIsLoading(0)
        }

    }, [isLoading])

    let data;
    switch (activeKey) {
        case '1':
            data = isDataInsumoTotal;
            break;
        case '2':
            data = isDataInsumoAgroquimicos;
            break;
        case '3':
            data = isDataInsumoSemillas;
            break;
        case '4':
            data = isDataInsumoFertilizantes;
            break;
        default:
            data = isDataInsumoTotal;
            break;
    }

    const handleLegendClick = (x) => {
        if (x.value === "Compra U$S") {
            setIsValorCompra(!isValorCompra);
        }

        if (x.value === "Estimado U$S") {
            setIsValorEstimado(!isValorEstimado);
        }
    };

    return (
        <>
            {/* <div div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginRight: '10px', border:"1px solid red" }}> */}
            <div className='div_grafico_insumos'>
                    <div>
                        <h1 className='titulos'>
                            ANALISIS INSUMOS COMPRADOS
                        </h1>
                    </div>
                    {
                        isLoading > 0 ?
                            <Tabs
                                className='tabs-custom'
                                activeKey={activeKey}
                                onChange={(key) => handleChangeTab(key)}
                            >
                                {items.map((item) => (
                                    <TabPane
                                        disabled={true}
                                        key={item.key}
                                        tab={item.label}>
                                    </TabPane>
                                ))}
                            </Tabs>
                            :
                            <Tabs
                                className='tabs-custom'
                                activeKey={activeKey}
                                onChange={(key) => handleChangeTab(key)}
                            >
                                {items.map((item) => (
                                    <TabPane
                                        key={item.key}
                                        tab={item.label}>
                                    </TabPane>
                                ))}
                            </Tabs>
                    }

                    {
                        isLoading > 0 ? <Spin className='prueba' tip="Loading" size="large" style={{ borderColor: 'red' }} > <div className="SpinLoading" /> </Spin> :
                            <ResponsiveContainer className="" width="99%" height={230}>
                                <ComposedChart
                                    height={250}
                                    data={
                                        activeKey === '1' ? isDataInsumoTotal :
                                            activeKey === '2' ? isDataInsumoAgroquimicos :
                                                activeKey === '3' ? isDataInsumoSemillas :
                                                    isDataInsumoFertilizantes
                                    }
                                    margin={{
                                        top: 20,
                                        right: 0,
                                        left: 0,
                                        bottom: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} horizontal={true} />
                                    <XAxis dataKey="cosecha" tick={() => null} />
                                    <YAxis tick={{ fontSize: 11 }} label={{ value: 'U$S', angle: -90, position: 'insideLeft', offset: -5, fontSize: "13px" }} />
                                    <Tooltip formatter={(value, name) =>
                                        name === 'Compra U$S' || name === 'Estimado U$S'
                                            ? format(',')(value).replace(/,/g, ".")
                                            : value
                                        } 
                                    />
                                    <Legend
                                        onClick={(x) => handleLegendClick(x)}
                                    />
                                    {isValorCompra ? (
                                        <Bar dataKey='Compra' name="Compra U$S" barSize={50} fill="#70DBE2" legendType='circle'>
                                            <LabelList dataKey="cosecha" position="bottom" fontSize={13} />
                                            <LabelList dataKey="Porcentaje" position="bottom" dy={13} fontSize={13} />
                                        </Bar>
                                    ) : (
                                        <Bar dataKey={0} name="Compra U$S" barSize={50} fill="#d8d8d8" legendType='circle'>
                                            <LabelList dataKey="cosecha" position="bottom" fontSize={13} />
                                            <LabelList dataKey="Porcentaje" position="bottom" dy={13} fontSize={13} />
                                        </Bar>
                                    )}
                                    {isValorEstimado ? (
                                        <Line type="monotone" name="Estimado U$S" dataKey='Estimado' stroke="#3359A3" strokeWidth={2} />
                                    ) : (
                                        <Line type="monotone" name="Estimado U$S" dataKey={0} stroke="#d8d8d8" strokeWidth={2} />
                                    )}
                                </ComposedChart>
                            </ResponsiveContainer>
                    }
            </div >
        </>
    )
}
