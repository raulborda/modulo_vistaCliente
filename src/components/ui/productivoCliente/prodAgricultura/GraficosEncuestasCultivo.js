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
        cosechaSeleccionada,
        usu,
        setSupEncuestadas,
    } = useContext(GlobalContext);

    const [selectedCultivo, setSelectedCultivo] = useState("");
    const [cultivos, setCultivos] = useState([]);
    const [cultivosSupEncuestadas, setCultivosSupEncuestadas] = useState([]);
    const [cultivosProdEncuestadas, setCultivosProdEncuestadas] = useState([]);
    const [cultivosCostoEncuestadas, setCultivosCostoEncuestadas] = useState([]);
    const [legendSupEncuestadas, setLegendSupEncuestadas] = useState({ activeIndex: 0 });
    const [legendProdEncuestadas, setLegendProdEncuestadas] = useState({ activeIndex: 0 });
    const [legendCostoEncuestadas, setLegendCostoEncuestadas] = useState({ activeIndex: 0 });

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

    function traeCultivos() {
        const data = new FormData();
        fetch(`${URL}clientview_listCultivos.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                const cultivosConTodos = [{ acult_id: "TODOS", acult_desc: "TODOS" }, ...objetoData];
                console.log('cultivosConTodos: ', cultivosConTodos);
                setCultivos(cultivosConTodos);
            });
        });
    }

    useEffect(() => {
        traeCultivos();
    }, [])

    useEffect(() => {
        const dataAdd = new FormData();
        dataAdd.append("idU", usu);
        dataAdd.append("idC", idCliente);
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
                const objetoData = JSON.parse(data);
                // Transformar los datos antes de asignarlos al estado
                const transformedData = objetoData.map((item) => {
                    return { name: item[0], value: item[1], colors: item[2] };
                });
                setCultivosSupEncuestadas(transformedData);
                // Calcular el total de los valores
                const total = transformedData.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.value;
                }, 0);
                // Hacer algo con el total, como asignarlo a un estado
                setSupEncuestadas(total);

            });
        });
    }, [selectedCultivo, selectedAcosDesc])

    useEffect(() => {
        const dataAdd = new FormData();
        dataAdd.append("idU", usu);
        dataAdd.append("idC", idCliente);
        if (cosechaSeleccionada) {
            dataAdd.append("idCos", cosechaSeleccionada);
        } else {
            dataAdd.append("idCos", cosechaActiva);
        }
        if (selectedCultivo !== 'TODOS') {
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
                const objetoData = JSON.parse(data);
                // Transformar los datos antes de asignarlos al estado
                const transformedData = objetoData.map((item) => {
                    return { name: item[0], value: item[1], colors: item[2] };
                });
                setCultivosProdEncuestadas(transformedData);
            });
        });
    }, [selectedCultivo, selectedAcosDesc])

    useEffect(() => {
        const dataAdd = new FormData();
        dataAdd.append("idU", usu);
        dataAdd.append("idC", idCliente);
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
                const objetoData = JSON.parse(data);
                // Transformar los datos antes de asignarlos al estado
                const transformedData = objetoData.map((item) => {
                    return { name: item[0], value: item[1], colors: item[2] };
                });
                setCultivosCostoEncuestadas(transformedData);
            });
        });
    }, [selectedCultivo, selectedAcosDesc])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div>
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <div style={{ paddingBottom: '15px' }}>
                                    <h1 className='titulos'>
                                        ENCUESTA POR SIEMBRA
                                    </h1>
                                </div>
                                <div style={{ marginLeft: '5px' }}>
                                    <h1 className='titulos'>
                                        CULTIVO
                                    </h1>
                                </div>
                                <div>
                                    <Select
                                        style={{ width: '200px' }}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(value) => setSelectedCultivo(value)}
                                        defaultValue='TODOS'
                                    >
                                        {cultivos.map((cultivo) => (
                                            <Select.Option key={cultivo.acult_id} value={cultivo.acult_id}>
                                                {cultivo.acult_desc}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <h1 className='titulos'>
                                SUPERFICIE
                            </h1>
                        </div>
                        <ResponsiveContainer className="" width="100%" height={260}>
                            <PieChart width={800} height={400} >
                                <Pie
                                    data={cultivosSupEncuestadas}
                                    activeIndex={legendSupEncuestadas.activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    onMouseEnter={onPieEnterSupEncuestadas}
                                >
                                    {cultivosSupEncuestadas.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.colors} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <h1 className='titulos'>
                                PRODUCTIVO
                            </h1>
                        </div>
                        <ResponsiveContainer className="" width="100%" height={260}>
                            <PieChart width={800} height={400} >
                                <Pie
                                    data={cultivosProdEncuestadas}
                                    activeIndex={legendProdEncuestadas.activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    onMouseEnter={onPieEnterProdEncuestadas}
                                >
                                    {cultivosProdEncuestadas.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.colors} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <h1 className='titulos'>
                                COSTO
                            </h1>
                        </div>
                        <ResponsiveContainer className="" width="100%" height={260}>
                            <PieChart width={800} height={400} >
                                <Pie
                                    data={cultivosCostoEncuestadas}
                                    activeIndex={legendCostoEncuestadas.activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    onMouseEnter={onPieEnterCostoEncuestadas}
                                >
                                    {cultivosCostoEncuestadas.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.colors} />
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
