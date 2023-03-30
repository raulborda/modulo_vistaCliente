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
                <div className='divProdAgriculturaDatos' style={{ paddingRight: '5px' }}>
                    <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                        <Card style={{ height: '100%' }}>
                        </Card>
                    </div>
                    <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF'  }}>
                        <Card className='cardAgricultura' style={{ height: '100%' }}>
                        </Card>
                    </div>
                    <div style={{ height: '100%' }}>
                        <Card className='cardAgricultura' style={{ height: '100%' }}>
                        </Card>
                    </div>
                </div>
                <Card style={{ width: '50%' }}>
                    <div className='divContainerGraficos'>
                        <GraficosProdAgricultura />
                    </div>
                </Card>
            </div>
            <div style={{ paddingLeft: '5px', paddingRight: '5px', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card>
                    <GraficosPrueba />
                </Card>
            </div>
        </div>
    )
}
