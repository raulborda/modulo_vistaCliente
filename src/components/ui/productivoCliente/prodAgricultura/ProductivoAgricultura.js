/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { BarChartOutlined, BarsOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Button, Card, Popover, Table } from 'antd'
import GraficosProdAgricultura from './graficosProdAgricultura/GraficosProdAgricultura'
import './index.css';
import { GraficosPrueba } from './GraficosPrueba';
import CardInsumos from './cardDatos/CardInsumos.js';
import { GlobalContext } from '../../../context/GlobalContext';
import Mapa from './MapasLotes';
import MapasLotes from './MapasLotes';

export const ProductivoAgricultura = () => {

    const URL = process.env.REACT_APP_URL;

    const {
        cardSelected,
        setCardSelected,
        idCliente,
        setIdCliente,
        selectedAcosDesc,
        setSelectedAcosDesc,
        cosechaAnterior,
        setCosechaAnterior,

        infoEvo,
        setInfoEvo,
        update,
        dataForChart,
        setDataForChart,

        //Insumos
        infoInsumoTotal,
        setInfoInsumoTotal,
        infoInsumoAgroquimicos,
        setInfoInsumoAgroquimicos,
        infoInsumoSemillas,
        setInfoInsumoSemillas,
        infoInsumoFertilizantes,
        setInfoInsumoFertilizantes,
        isDataInsumoTotal, setIsDataInsumoTotal,
        isDataInsumoAgroquimicos, setIsDataInsumoAgroquimicos,
        isDataInsumoSemillas, setIsDataInsumoSemillas,
        isDataInsumoFertilizantes, setIsDataInsumoFertilizantes,

        //ACOPIO
        infoTotal,
        setInfoTotal,
        infoSoja,
        setInfoSoja,
        infoTrigo,
        setInfoTrigo,
        infoMaiz,
        setInfoMaiz,
        infoOtrosGranos,
        setInfoOtrosGranos,
        isDataTotal, setIsDataTotal,
        isDataSoja, setIsDataSoja,
        isDataTrigo, setIsDataTrigo,
        isDataMaiz, setIsDataMaiz,
        isDataOtrosGranos, setIsDataOtrosGranos,

        //Ver lotes
        visible, 
        setVisible,

    } = useContext(GlobalContext);


    return (
        
        <>
        {visible === false ? (
            <>
                <div className='divContainerAgricultura'>
                    <div className='divProdAgricultura'>
                        <div className='divProdAgriculturaDatos' style={{  }}>
                            <CardInsumos />
                        </div>
                        <Card
                            style={{
                                width: '50%',
                                borderTop: '2px dashed #56D75B',
                                borderBottom: '2px dashed #56D75B',
                                borderRight: '2px dashed #56D75B',
                                borderLeft: '0px dashed #FFFF',
                                borderTopLeftRadius: '0%',
                                borderBottomLeftRadius: '0%',
                            }}>
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
            </>
                        
        ): (
            <>
                <div>
                    <h3>Lotes</h3>
                    <Button
                        onClick={() => setVisible(!visible)}
                    >
                        Volver
                    </Button>
                    <MapasLotes/>
                </div>
            </>
        )}
        </>
    )
}
