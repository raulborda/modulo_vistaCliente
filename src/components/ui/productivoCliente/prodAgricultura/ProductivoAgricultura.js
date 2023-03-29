import React from 'react'
import { useState } from 'react';
import { BarChartOutlined, BarsOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Card, Popover, Table } from 'antd'
import GraficosProdAgricultura from './GraficosProdAgricultura'
import './index.css';
import { GraficosPrueba } from './GraficosPrueba';

export const ProductivoAgricultura = () => {

    const [infoLotes, setInfoLotes] = useState(false);

    const verLotes = () => {
        setInfoLotes(!infoLotes)
    }



    const columns = [
        {
            title: 'Rubro',
            dataIndex: 'Rubro',
            key: 'Rubro',
        },
        {
            title: 'Propias',
            dataIndex: 'Propias',
            key: 'Propias',
        },
        {
            title: 'Alquiladas',
            dataIndex: 'Alquiladas',
            key: 'Alquiladas',
        },
    ];

    const data = [
        {
            key: '1',
            Rubro: 'Agricultura',
            Propias: 1000,
            Alquiladas: 1500,
        },
        {
            key: '2',
            Rubro: 'Ganaderia',
            Propias: 2000,
            Alquiladas: 1500,
        },
        {
            key: '3',
            Rubro: 'Tambo',
            Propias: 1250,
            Alquiladas: 800,
        },
        {
            key: '4',
            Rubro: 'Mixto',
            Propias: 1600,
            Alquiladas: 1500,
        },
        {
            key: '5',
            Rubro: 'Total',
            Propias: 5850,
            Alquiladas: 5300,
        },
    ];

    const text = <span>Lotes</span>;
    const content = (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
    const buttonWidth = 70;

    return (
        <div className='divContainerAgricultura'>
            <div className='divProdAgricultura'>
                <div className='divProdAgriculturaDatos'>
                    <div style={{height: '100%'}}>
                        <Card className='cardAgricultura' style={{ height: '100%' }}>
                            <div style={{ marginLeft: '-15px', marginTop: '-15px' }}>
                                <h1
                                    style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Open Sans, sans-serif' }}
                                >
                                    ACONCAGUA S.R.L
                                </h1>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ fontWeight: '700' }}>Total Has.: </p>
                                    <p style={{ marginLeft: '10px' }}>11150has.</p>
                                    <Popover placement="rightTop" title={text} content={content} trigger="click">
                                        <BarsOutlined className='btnVerLotes' title='Lotes' />
                                    </Popover>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ fontWeight: '700' }} >Año Anterior: </p>
                                    <p style={{ marginLeft: '10px' }}>900has. (90% <CaretUpOutlined style={{ color: '#00b33c' }} />)</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div style={{height: '100%'}}>
                        <Card className='cardAgricultura' style={{ height: '100%'}}>
                            <div style={{ marginLeft: '-15px', marginTop: '-15px' }}>
                                <p style={{ fontWeight: '700' }} >Insumos:</p>
                            </div>
                        </Card>
                    </div>
                </div>
                <Card className='cardAgricultura' style={{ width: '100%' }}>
                    <div className='divContainerGraficos'>
                        <GraficosProdAgricultura />
                    </div>
                </Card>
            </div>
            <div>
                <Card className='cardAgricultura'>
                    <GraficosPrueba />
                </Card>
            </div>
        </div>
    )
}
