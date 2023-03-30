import React from 'react'
import { useState } from 'react';
import { BarChartOutlined, BarsOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Card, Popover, Table } from 'antd'
import GraficosProdAgricultura from './GraficosProdAgricultura'
import './index.css';
import { GraficosPrueba } from './GraficosPrueba';
import CardInsumos from './CardInsumos';

export const ProductivoAgricultura = () => {



    return (
        <div className='divContainerAgricultura'>
            <div className='divProdAgricultura'>
                <div className='divProdAgriculturaDatos' style={{ paddingRight: '5px' }}>
                    <CardInsumos />
                </div>
                <Card style={{ width: '60%' }}>
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
