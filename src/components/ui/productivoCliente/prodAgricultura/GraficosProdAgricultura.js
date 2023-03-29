import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraficosProdAgricultura = () => {

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

    const COLORS = ["#116611", "#56b43c", "#55AA55", "#88CC88"];

    const dataAnillo = [
        { name: 'Agricultura', value: 400 },
        { name: 'Ganaderia', value: 300 },
        { name: 'Tambo', value: 300 },
        { name: 'Mixto', value: 200 },
    ];

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ width: '70%', marginRight: '10px' }}>
                    <ResponsiveContainer className="" width="100%" height={/*400*/ 250}>
                        <BarChart
                            // width={367}
                            height={250}
                            data={data}
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
                            <Tooltip />
                            <Legend
                                iconType="circle"
                                wrapperStyle={{ fontWeight: "bold", color: "#000000" }}
                            />
                            <Bar
                                dataKey="propias"
                                name="Propias"
                                stackId="a"
                                barSize={50}
                                fill="#a9ff96"
                                key={"propias"}
                                isAnimationActive={true}
                            />
                            <Bar
                                dataKey="alquiladas"
                                name="Alquiladas"
                                stackId="a"
                                barSize={50}
                                fill="#434348"
                                key={"alquiladas"}
                                isAnimationActive={true}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ width: '30%', marginRight: '10px' }}>
                    <ResponsiveContainer className="" width="100%" height={/*400*/ 250}>
                        <PieChart
                            // width={400}
                            height={250}
                        >
                            <Legend
                                className="legendAnillo"
                                iconType="circle"
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                            />
                            <Pie
                                className="pie"
                                data={dataAnillo}
                                cx={100}
                                cy={120}
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
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default GraficosProdAgricultura;