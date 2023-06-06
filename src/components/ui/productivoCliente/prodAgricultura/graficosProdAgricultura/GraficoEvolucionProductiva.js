import React, { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { GlobalContext } from '../../../../context/GlobalContext';
import { PieChartOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';

const GraficoEvolucionProductiva = ({ porcentajes }) => {

    const {
        cardSelected,
        setCardSelected,
        idCliente,
        setIdCliente,

        infoEvo,
        setInfoEvo,
        update,
        dataForChart,
        setDataForChart,

        iconTable,
        setIconTable,
    } = useContext(GlobalContext);

    const data = [
        {
            cosecha: '2324',
            propias: 4000,
            alquiladas: 2400,
        },
        {
            cosecha: '2223',
            propias: 3000,
            alquiladas: 1398,
        },
        {
            cosecha: '2122',
            propias: 2000,
            alquiladas: 9800,
        },
        {
            cosecha: '2021',
            propias: 2780,
            alquiladas: 3908,
        }
    ];

    const COLORS = ["#7B241C", "#CB4335", "#F1948A", "#FADBD8"];

    const dataAnillo = [
        { name: 'Agricultura', value: 400 },
        { name: 'Ganaderia', value: 300 },
        { name: 'Tambo', value: 300 },
        { name: 'Mixto', value: 200 },
    ];


    /*-----------------------------------*/
    const [isValorPropias, setIsValorPropias] = useState(true);
    const [isValorAlquiladas, setIsValorAlquiladas] = useState(true);
    /*-----------------------------------*/

    const handleLegendClick = (x) => {
        console.log(x);
        console.log("click");
        if (x.value === "Propias") {
            console.log("seleccionaste propias");
            setIsValorPropias(!isValorPropias);
        }

        if (x.value === "Alquiladas") {
            console.log("seleccionaste alquiladas");
            setIsValorAlquiladas(!isValorAlquiladas);
        }
    };
    /*-----------------------------------*/



    const getIntroOfPage = (valor0, valor1) => {
        if (valor0 === "" || valor0 === "undefined" || valor0 === null || valor0 === 0) {
            valor0 = 0;
        }
        if (valor1 === "" || valor1 === "undefined" || valor1 === null || valor1 === 0) {
            valor1 = 0;
        }
        var suma = Math.trunc(valor0) + Math.trunc(valor1);
        return suma;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        //PAARA VER AMBAS BARRAS
        if (active && payload && payload.length && isValorPropias === true && isValorAlquiladas === true) {
            return (
                <div className="custom-tooltip" style={{ border: "3px solid grey", backgroundColor: "#FFFF", padding: "10px", borderRadius: "4px" }}>
                    <p className="label" style={{ color: "grey", fontWeight: "500" }}>{`Cosecha: ${label}`}</p>
                    <p className="propias" style={{ color: "#B10C5B", fontWeight: "500" }}>{`Propias: ${Math.trunc(payload[0].value)}`}</p>
                    <p className="alquiladas" style={{ color: "#282828", fontWeight: "500" }}>{`Alquiladas: ${Math.trunc(payload[1].value)}`}</p>
                    <p className="total" style={{ color: "grey", fontWeight: "500" }}>{"Total: " + getIntroOfPage(payload[0].value, payload[1].value)}</p>
                </div>
            );
        }
        //PARA VER SOLO ALQUILADAS
        if (active && payload && payload.length && isValorAlquiladas === true && isValorPropias === false) {
            return (
                <div className="custom-tooltip" style={{ border: "3px solid grey", backgroundColor: "#FFFF", padding: "10px", borderRadius: "4px" }}>
                    <p className="label" style={{ color: "grey", fontWeight: "500" }}>{`Cosecha: ${label}`}</p>
                    <p className="alquiladas" style={{ color: "#282828", fontWeight: "500" }}>{`Alquiladas: ${Math.trunc(payload[0].value)}`}</p>
                </div>
            );
        }
        //PARA VER SOLO PROPIAS
        if (active && payload && payload.length && isValorPropias === true && isValorAlquiladas === false) {
            return (
                <div className="custom-tooltip" style={{ border: "3px solid grey", backgroundColor: "#FFFF", padding: "10px", borderRadius: "4px" }}>
                    <p className="label" style={{ color: "grey", fontWeight: "500" }}>{`Cosecha: ${label}`}</p>
                    <p className="propias" style={{ color: "#B10C5B", fontWeight: "500" }}>{`Propias: ${Math.trunc(payload[0].value)}`}</p>
                </div>
            );
        }

        return null;
    };



    if (!porcentajes || !Array.isArray(porcentajes) || porcentajes.length === 0) {
        return (
            <Empty
                style={{ marginTop: "20%" }}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    const dataAnillaco = [
        {
            name: "Agricultura",
            value: parseInt(porcentajes[0].porcentaje),
            namet: "Total",
            has: porcentajes[0].total,
        },
        {
            name: "Ganaderia",
            value: parseInt(porcentajes[1].porcentaje),
            namet: "Total",
            has: porcentajes[1].total,
        },
        {
            name: "Tambo",
            value: parseInt(porcentajes[2].porcentaje),
            namet: "Total",
            has: porcentajes[2].total,
        },
        {
            name: "Mixto",
            value: parseInt(porcentajes[3].porcentaje),
            namet: "Total",
            has: porcentajes[3].total,
        },
    ];


    /*--------------------------- */
    const verGrafico = () => {
        setCardSelected(1)
        setIconTable(!iconTable);
    }

    const formatter = (value, name, props) => {
        return (
            <div>
                <p
                    className="label"
                    style={{ color: "grey", fontWeight: "500" }}
                >{`${props.payload.namet}: ${props.payload.has} has.`}</p>
                <p
                    className="label"
                    style={{ color: "grey", fontWeight: "500" }}
                >{`Porcentaje: ${value}%`}</p>
            </div>
        );
    };



    return (
        <>
            <div div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <div style={{ width: '70%', marginRight: '10px', height: '100%' }}>
                    <ResponsiveContainer className="" width="99%" height={250}>
                        <BarChart
                            height={250}
                            data={dataForChart}
                            margin={{
                                top: 20,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="cosecha" />
                            <YAxis
                                label={{ value: "Has.", angle: -90, position: "insideLeft" }}
                            />
                            <Tooltip
                                content={CustomTooltip}
                            />
                            <Legend
                                iconType="circle"
                                onClick={(x) => handleLegendClick(x)}
                                wrapperStyle={{ fontWeight: "bold", color: "#000000" }}
                            />
                            {isValorPropias ? (
                                <Bar
                                    dataKey="propias"
                                    name="Propias"
                                    stackId="a"
                                    barSize={50}
                                    fill="#B10C5B"
                                    key={"propias"}
                                    isAnimationActive={true}
                                />
                            ) : (
                                <Bar
                                    dataKey={0}
                                    name="Propias"
                                    stackId="a"
                                    barSize={50}
                                    fill="#d8d8d8"
                                    key={"propias"}
                                    isAnimationActive={true}
                                />
                            )}
                            {isValorAlquiladas ? (
                                <Bar
                                    dataKey="alquiladas"
                                    name="Alquiladas"
                                    stackId="a"
                                    barSize={50}
                                    fill="#282828"
                                    key={"alquiladas"}
                                    isAnimationActive={true}
                                />
                            ) : (
                                <Bar
                                    dataKey={0}
                                    name="Alquiladas"
                                    stackId="a"
                                    barSize={50}
                                    fill="#d8d8d8"
                                    key={"alquiladas"}
                                    isAnimationActive={true}
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ width: '30%', marginRight: '10px' }}>
                    <ResponsiveContainer className="" width="100%" height={250}>
                        <PieChart
                            height={250}
                        >
                            <Legend
                                className="legendAnillo"
                                iconType="circle"
                                layout="horizontal"
                                align="center"
                                verticalAlign="bottom"
                            />
                            <Pie
                                className="pie"
                                data={dataAnillaco}
                                cx={120}
                                cy={110}
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                cursor="pointer"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip formatter={formatter} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div >
        </>
    )
}

export default GraficoEvolucionProductiva;