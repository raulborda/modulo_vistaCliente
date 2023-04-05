import { Table } from 'antd';
import React, { useContext, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlobalContext } from '../../../../context/GlobalContext';
import { GraficoAcopioTT } from './GraficoAcopioTT';
import GraficoEvolucionProductiva from './GraficoEvolucionProductiva';
import { GraficoInsumos } from './GraficoInsumos';
import './graficos.css';

const GraficosProdAgricultura = () => {

    const {
        cardSelected,
        setCardSelected,
        // tipoGrafico, 
        // settipoGrafico,
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



    const handleStage = () => {
        switch (cardSelected) {
            case 0:
                return <GraficoEvolucionProductiva />;
            case 1:
                return (
                    // <GraficoEvolucionProductiva />
                    <Table
                        columns={columns}
                        dataSource={dataTable} //Original
                        pagination={false}
                    />
                );
            case 2:
                return <GraficoInsumos />;
            case 3:
                return <GraficoAcopioTT />;
            default:
                return (
                    <GraficoEvolucionProductiva />
                    // <Table
                    //     columns={columns}
                    //     dataSource={dataTable} //Original
                    //     pagination={false}
                    // />
                );
        }
    };


    return (
        <>
            {handleStage()}
        </>
    )
}

export default GraficosProdAgricultura;