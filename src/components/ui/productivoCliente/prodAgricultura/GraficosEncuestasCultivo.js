import { Card, Select, Statistic } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';
import { GlobalContext } from '../../../context/GlobalContext';


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Cantidad ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export const GraficosEncuestasCultivo = ({ cosechaActiva }) => {
    const URL = process.env.REACT_APP_URL;


    const {
        idCliente,
        selectedAcosDesc,
        infoCosechas,
        cosechaSeleccionada,
        setCosechaSeleccionada,
        usu,
    } = useContext(GlobalContext);

    const [selectedCultivo, setSelectedCultivo] = useState("");
    const [cultivos, setCultivos] = useState([]);
    const [supEncuestadas, setSupEncuestadas] = useState();
    const [cultivosSupEncuestadas, setCultivosSupEncuestadas] = useState([]);
    const [cultivosProdEncuestadas, setCultivosProdEncuestadas] = useState([]);
    const [cultivosCostoEncuestadas, setCultivosCostoEncuestadas] = useState([]);
    const [legendSupEncuestadas, setLegendSupEncuestadas] = useState({ activeIndex: 0 });
    const [legendProdEncuestadas, setLegendProdEncuestadas] = useState({ activeIndex: 0 });
    const [legendCostoEncuestadas, setLegendCostoEncuestadas] = useState({ activeIndex: 0 });
    // const [state, setState] = useState({ activeIndex: 0 });
    // const [state, setState] = useState({ activeIndex: 0 });

    const onPieEnterSupEncuestadas = (_, index) => {
        setLegendSupEncuestadas({
            activeIndex: index,
        });
    };
    const onPieEnterProdEncuestadas = (_, index) => {
        setLegendProdEncuestadas({
            activeIndex: index,
        });
    };
    const onPieEnterCostoEncuestadas = (_, index) => {
        setLegendCostoEncuestadas({
            activeIndex: index,
        });
    };



    const data = [
        { name: 'TRIGO', value: 400 },
        { name: 'ALFALFA', value: 300 },
        { name: 'MAIZ', value: 300 },
        { name: 'SOJA', value: 200 },
    ];

    const data1 = [
        { name: 'TRIGO', value: 430 },
        { name: 'ALFALFA', value: 3000 },
        { name: 'MAIZ', value: 542 },
        { name: 'SOJA', value: 1000 },
    ];

    const data2 = [
        { name: 'TRIGO', value: 4960 },
        { name: 'ALFALFA', value: 3720 },
        { name: 'MAIZ', value: 3030 },
        { name: 'SOJA', value: 500 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const COLORS1 = ["#116611", "#56b43c", "#55AA55", "#88CC88"];
    const COLORS2 = ["#112611", "#56F43c", "#552A55", "#17DA78"];

    const formatter = (value) => <CountUp end={value} separator="," />;


    function traeCultivos() {
        const data = new FormData();
        fetch(`${URL}clientview_listCultivos.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                // console.log('data: ', data);
                const objetoData = JSON.parse(data);
                // console.log('objetoData: ', objetoData);
                const cultivosConTodos = [{ acult_id: "TODOS", acult_desc: "TODOS" }, ...objetoData];
                console.log('cultivosConTodos: ', cultivosConTodos);
                setCultivos(cultivosConTodos);
            });
        });
    }

    useEffect(() => {
        traeCultivos();
    }, [])
    // var total = 0;
    useEffect(() => {
        const dataAdd = new FormData();
        dataAdd.append("idU", usu);
        dataAdd.append("idC", idCliente);
        // dataAdd.append("idCos", cosechaSeleccionada);
        if (cosechaSeleccionada) {
            dataAdd.append("idCos", cosechaSeleccionada);
        } else {
            dataAdd.append("idCos", cosechaActiva);
        }

        if (selectedCultivo === 'TODOS') {
            dataAdd.append("idCul", '');
        } else {
            dataAdd.append("idCul", selectedCultivo);
        }

        fetch(`${URL}clientview_SupEncuestasCultivo.php`, {
            method: "POST",
            body: dataAdd,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                // console.log("data Traer datos segun filtros: ", data);
                const objetoData = JSON.parse(data);

                // Transformar los datos antes de asignarlos al estado
                const transformedData = objetoData.map((item) => {
                    return { name: item[0], value: item[1] };
                });

                setCultivosSupEncuestadas(transformedData);
                console.log("setCultivosSupEncuestadas: ", transformedData);
                // Calcular el total de los valores
                const total = transformedData.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.value;
                }, 0);

                console.log("Total:", total);

                // Hacer algo con el total, como asignarlo a un estado
                setSupEncuestadas(total);

            });
        });
    }, [selectedCultivo, selectedAcosDesc])

    useEffect(() => {
        const dataAdd = new FormData();
        dataAdd.append("idU", usu);
        dataAdd.append("idC", idCliente);
        // dataAdd.append("idCos", cosechaSeleccionada);
        if (cosechaSeleccionada) {
            dataAdd.append("idCos", cosechaSeleccionada);
        } else {
            dataAdd.append("idCos", cosechaActiva);
        }

        if (selectedCultivo === 'TODOS') {
            dataAdd.append("idCul", '');
        } else {
            dataAdd.append("idCul", selectedCultivo);
        }

        fetch(`${URL}clientview_ProdEncuestasCultivo.php`, {
            method: "POST",
            body: dataAdd,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                // console.log("data Traer datos segun filtros: ", data);
                const objetoData = JSON.parse(data);

                // Transformar los datos antes de asignarlos al estado
                const transformedData = objetoData.map((item) => {
                    return { name: item[0], value: item[1] };
                });

                setCultivosProdEncuestadas(transformedData);
                console.log("setCultivosProdEncuestadas: ", transformedData);

            });
        });
    }, [selectedCultivo, selectedAcosDesc])

    useEffect(() => {
        const dataAdd = new FormData();
        dataAdd.append("idU", usu);
        dataAdd.append("idC", idCliente);
        // dataAdd.append("idCos", cosechaSeleccionada);
        if (cosechaSeleccionada) {
            dataAdd.append("idCos", cosechaSeleccionada);
        } else {
            dataAdd.append("idCos", cosechaActiva);
        }

        if (selectedCultivo === 'TODOS') {
            dataAdd.append("idCul", '');
        } else {
            dataAdd.append("idCul", selectedCultivo);
        }

        fetch(`${URL}clientview_CostoEncuestasCultivo.php`, {
            method: "POST",
            body: dataAdd,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                // console.log("data Traer datos segun filtros: ", data);
                const objetoData = JSON.parse(data);

                // Transformar los datos antes de asignarlos al estado
                const transformedData = objetoData.map((item) => {
                    return { name: item[0], value: item[1] };
                });

                setCultivosCostoEncuestadas(transformedData);
                console.log("setCultivosProdEncuestadas: ", transformedData);

            });
        });
    }, [selectedCultivo, selectedAcosDesc])







    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <Card>
                        <Card>
                            <h1 className='titulos'>
                                CULTIVO
                            </h1>
                            <Select
                                style={{ width: '200px', marginLeft: '20px' }}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(value) => setSelectedCultivo(value)}
                                // defaultValue={cultivos.length > 0 && cultivos[0].acult_id}
                                defaultValue='TODOS'
                            >
                                {cultivos.map((cultivo) => (
                                    <Select.Option key={cultivo.acult_id} value={cultivo.acult_id}>
                                        {cultivo.acult_desc}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Statistic title="SUP. ENCUESTADA" value={supEncuestadas} formatter={formatter} />
                        </Card>
                    </Card>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '33%', marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <h1 className='titulos'>
                                SUP ENCUESTADAS por CULTIVO
                            </h1>
                        </div>
                        <ResponsiveContainer className="" width="100%" height={250}>
                            <PieChart width={800} height={400} >
                                <Pie
                                    data={cultivosSupEncuestadas}
                                    activeIndex={legendSupEncuestadas.activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    // fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnterSupEncuestadas}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '33%', marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <h1 className='titulos'>
                                PROD ENCUESTADAS por CULTIVO
                            </h1>
                        </div>
                        <ResponsiveContainer className="" width="100%" height={250}>
                            <PieChart width={800} height={400} >
                                <Pie
                                    data={cultivosProdEncuestadas}
                                    activeIndex={legendProdEncuestadas.activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    // fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnterProdEncuestadas}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '33%', marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <h1 className='titulos'>
                                COSTO ENCUESTADAS por CULTIVO
                            </h1>
                        </div>
                        <ResponsiveContainer className="" width="100%" height={250}>
                            <PieChart width={800} height={400} >
                                <Pie
                                    data={cultivosCostoEncuestadas}
                                    activeIndex={legendCostoEncuestadas.activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    // fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnterCostoEncuestadas}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS2[index % COLORS2.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>

    )
}
