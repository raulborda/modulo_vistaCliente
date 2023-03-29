import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const GraficosPrueba = () => {


    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const data1 = [
        { name: 'Prueba 1', value: 430 },
        { name: 'Prueba 2', value: 3000 },
        { name: 'Prueba 3', value: 542 },
        { name: 'Prueba 4', value: 1000 },
    ];

    const data2 = [
        { name: 'Prueba 5', value: 4960 },
        { name: 'Prueba 6', value: 3720 },
        { name: 'Prueba 7', value: 3030 },
        { name: 'Prueba 8', value: 500 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const COLORS1 = ["#116611", "#56b43c", "#55AA55", "#88CC88"];
    const COLORS2 = ["#112611", "#56F43c", "#552A55", "#17DA78"];
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '33%', marginRight: '10px' }}>
                    <ResponsiveContainer className="" width="100%" height={250}>
                        <PieChart width={800} height={400} >
                            <Pie
                                data={data}
                                cx={160}
                                cy={120}
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Legend
                                className="legendAnillo"
                                iconType="circle"
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                                margin={{ right: '50px' }}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '33%', marginRight: '10px' }}>
                    <ResponsiveContainer className="" width="100%" height={250}>
                        <PieChart width={800} height={400} >
                            <Pie
                                data={data1}
                                cx={160}
                                cy={120}
                                startAngle={360}
                                endAngle={0}
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                ))}
                            </Pie>

                            <Legend
                                className="legendAnillo"
                                iconType="circle"
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '33%', marginRight: '10px' }}>
                    <ResponsiveContainer className="" width="100%" height={250}>
                        <PieChart width={800} height={400} >
                            <Pie
                                className="pie"
                                data={data2}
                                cx={160}
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
                                        fill={COLORS2[index % COLORS2.length]}
                                    />
                                ))}
                            </Pie>

                            <Legend
                                className="legendAnillo"
                                iconType="circle"
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>

    )
}
