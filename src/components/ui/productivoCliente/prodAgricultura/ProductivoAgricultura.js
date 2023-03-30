import React from 'react'
import { useState } from 'react';
import { BarChartOutlined, BarsOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Card, Popover, Table } from 'antd'
import GraficosProdAgricultura from './GraficosProdAgricultura'
import './index.css';
import { GraficosPrueba } from './GraficosPrueba';

export const ProductivoAgricultura = () => {

    const [cardStyle, setCardStyle] = useState({});

    const handleClick = () => {
        setCardStyle({ border: '2px solid green' });
    };


    return (
        <div className='divContainerAgricultura'>
            <div className='divProdAgricultura'>
                <div className='divProdAgriculturaDatos' style={{ paddingRight: '5px' }}>
                    <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                        <Card className='cardAgricultura'
                            style={cardStyle} onClick={handleClick}
                        >
                        </Card>
                    </div>
                    <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                        <Card className='cardAgricultura'
                            style={cardStyle} onClick={handleClick}
                        >
                        </Card>
                    </div>
                    <div style={{ height: '100%' }}>
                        <Card className='cardAgricultura'
                            style={cardStyle} onClick={handleClick}
                        >
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
