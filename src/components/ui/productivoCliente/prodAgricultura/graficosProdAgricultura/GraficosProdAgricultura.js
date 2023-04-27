import { Button, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlobalContext } from '../../../../context/GlobalContext';
import { GraficoAcopioTT } from './GraficoAcopioTT';
import GraficoEvolucionProductiva from './GraficoEvolucionProductiva';
import { GraficoInsumos } from './GraficoInsumos';
import './graficos.css';
import { InfoCircleOutlined, PieChartOutlined } from '@ant-design/icons';

const GraficosProdAgricultura = () => {
    const URL = process.env.REACT_APP_URL;

    const {
        cardSelected,
        setCardSelected,
        // tipoGrafico, 
        // settipoGrafico,
        iconTable,
        setIconTable,
        infoEdit,
        setInfoEdit,
        idCliente,
        cosecha,
        infoRubros, setInfoRubros,
        infoCap, setInfoCap,
        selectedAcosDesc,
        setSelectedAcosDesc,
        infoCosechas, 
        setCosechas,
    } = useContext(GlobalContext);


    const columns = [
        {
            title: "",
            dataIndex: "categoria",
            key: "categoria",
            render: (text, record) => (
                <span>
                    {record.categoria === "TOTAL" ? <strong>TOTAL</strong> : text}
                </span>
            ),
        },
        {
            title: <span style={{ color: "#00b33c" }}>PROPIAS</span>,
            dataIndex: "propias",
            key: "propias",
            editable: true,
            width: "20%",
            align: "right",
        },
        {
            title: <span style={{ color: "#00b33c" }}>ALQUILER</span>,
            dataIndex: "alquiler",
            key: "alquiler",
            editable: true,
            width: "20%",
            align: "right",
        },
        {
            title: <span style={{ color: "#00b33c" }}>TOTAL</span>,
            dataIndex: "total",
            key: "total",
            editable: true,
            width: "20%",
            align: "right",
        },
        {
            title: <span style={{ color: "#00b33c" }}>(%)</span>,
            dataIndex: "porcentaje",
            key: "porcentaje",
            editable: true,
            width: "20%",
            align: "right",
        },
    ];

    const dataTable = [
        {
            key: '1',
            categoria: 'AGRICULTURA',
            propias: 1500,
            alquiler: 2000,
            total: 3500,
            porcentaje: '50%'
        },
        {
            key: '2',
            categoria: 'GANADERIA',
            propias: 1500,
            alquiler: 2000,
            total: 3500,
            porcentaje: '50%'
        },
        {
            key: '3',
            categoria: 'TAMBO',
            propias: 1500,
            alquiler: 2000,
            total: 3500,
            porcentaje: '50%'
        },
        {
            key: '3',
            categoria: 'MIXTO',
            propias: 1500,
            alquiler: 2000,
            total: 3500,
            porcentaje: '50%'
        },
        {
            key: '3',
            categoria: 'TOTAL',
            propias: 1500,
            alquiler: 2000,
            total: 3500,
            porcentaje: '50%'
        },
    ];

    var result = {};
    let capacidad = [];

    const generaData = (infoCap) => {

        setInfoEdit(infoCap);
        // Iterar sobre cada objeto del array
        infoCap.forEach(info => {
            // Verificar si ya existe el arubro_desc en el objeto result
            if (!result[info.arubro_desc]) {
                result[info.arubro_desc] = {};
            }

            // Verificar la condición y asignar el valor correspondiente
            if (info.condicion === "P") {
                result[info.arubro_desc].propio = info.has;
            } else {
                result[info.arubro_desc].alquilado = info.has;
            }
        });


        capacidad = result;

        capacidad = [
            {
                key: 1,
                categoria: "AGRICULTURA",
                propias: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.propio) : 0,
                alquiler: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.alquilado) : 0,
                total: result.AGRICULTURA ? parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado) : 0,
                porcentaje: (((result.AGRICULTURA ? (parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'
            },
            {
                key: 2,
                categoria: "GANADERIA",
                propias: result.GANADERIA ? Math.trunc(result.GANADERIA.propio) : 0,
                alquiler: result.GANADERIA ? Math.trunc(result.GANADERIA.alquilado) : 0,
                total: result.GANADERIA ? parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado) : 0,
                porcentaje: (((result.GANADERIA ? (parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'
            },
            {
                key: 3,
                categoria: "TAMBO",
                propias: result.TAMBO ? Math.trunc(result.TAMBO.propio) : 0,
                alquiler: result.TAMBO ? Math.trunc(result.TAMBO.alquilado) : 0,
                total: result.TAMBO ? parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado) : 0,
                porcentaje: (((result.TAMBO ? (parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'
            },
            {
                key: 4,
                categoria: "MIXTO",
                propias: result.MIXTO ? Math.trunc(result.MIXTO.propio) : 0,
                alquiler: result.MIXTO ? Math.trunc(result.MIXTO.alquilado) : 0,
                total: result.MIXTO ? parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado) : 0,
                porcentaje: (((result.MIXTO ? (parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'

            },
            {
                key: 5,
                categoria: (
                    <>
                        <strong>TOTAL </strong>
                        <InfoCircleOutlined
                            title="El total puede diferir porque no es sumatoria del desglose por rubro."
                            style={{ color: "#00b33c" }}
                        />
                    </>
                ),
                propias: <strong>{Math.trunc(infoCap[0].ahxs_propias)}</strong>,
                alquiler: <strong>{Math.trunc(infoCap[0].ahxs_alquiladas)}</strong>,
                total: <strong>{parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)}</strong>,
                porcentaje: <strong>{(((parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'}</strong>


            },
        ];

        // console.log('capacidad: ', capacidad);
        // console.log('result: ', result);
        return result;
    };






    const handleStage = () => {
        switch (cardSelected) {
            case 0:
                return <GraficoEvolucionProductiva porcentajes={capacidad} />;
            case 1:
                return (
                    <Table
                        columns={columns}
                        dataSource={capacidad} //Original
                        pagination={false}
                    />
                );
            case 2:
                return <GraficoInsumos />;
            case 3:
                return <GraficoAcopioTT />;
            default:
                return (
                    <GraficoEvolucionProductiva porcentajes={capacidad} />
                    // <Table
                    //     columns={columns}
                    //     dataSource={dataTable} //Original
                    //     pagination={false}
                    // />
                );
        }
    };

    const verGrafico = () => {
        // if (iconTable === false) {
        //     setCardSelected(0)
        //     setIconTable(!iconTable);
        // } else {
        setCardSelected(0)
        setIconTable(!iconTable);
        // }
    }


    //* FUNCION QUE TRAE LOS DATOS DE TABLA RUBROS
    function rubros() {
        // Trae la información  con GET
        fetch(`${URL}com_traerRubros.php`, {
            method: "GET",
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                setInfoRubros(objetoData);
                // console.log('objetoData - setInfoRubros : ', objetoData)
            });
        });
    }

    var cosechaa = parseInt(selectedAcosDesc);
    //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CAPACIDAD PRODUCTIVA INICIAL
    useEffect(() => {
        if (idCliente) {
            const data = new FormData();
            data.append("idC", idCliente);
            data.append("cosecha", cosechaa);
            fetch(`${URL}com_tabCapacidadData.php`, {
                method: "POST",
                body: data,
            }).then(function (response) {
                response.text().then((resp) => {
                    const data = resp;
                    const objetoData = JSON.parse(data);
                    // console.log('objetoData - setInfoCap : ', objetoData)
                    setInfoCap(objetoData);
                });
            });
            // cosechas(idCliente);
            rubros();
        }
    }, [idCliente, selectedAcosDesc]);

    if (infoCap.length > 0) {
        generaData(infoCap);
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '250px' }}>
                {cardSelected === 1 &&
                    (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h1 className='titulos'>
                                CAPACIDAD PRODUCTIVA
                            </h1>
                            {/* <PieChartOutlined title='Gráfico' className='iconTableOutlined' onClick={() => { verGrafico(); }} /> */}
                            <Button
                                icon={<PieChartOutlined />}
                                type="primary"
                                style={{ marginLeft: '10px', marginTop: '-5px', backgroundColor: '#00B33C' }}
                                onClick={() => { verGrafico(); }}
                            >
                                Ver Gráfico
                            </Button>
                        </div>
                    )
                }
                {handleStage()}
            </div>
        </>
    )
}

export default GraficosProdAgricultura;