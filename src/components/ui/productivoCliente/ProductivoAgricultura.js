import { Card } from 'antd'
import React from 'react'
import './productivoCliente.css'

export const ProductivoAgricultura = () => {
    return (
        <div className='divContainerAgricultura'>
            <div className='divProdAgricultura'>
                <div className='divProdAgriculturaDatos'>
                    <Card>
                        <p>Hola1</p>
                    </Card>

                    <Card>
                        <p>Hola2</p>
                    </Card>
                </div>
                {/* <div> */}
                    <Card style={{ width: '100%'}}>
                        <p>Hola3</p>
                    </Card>
                {/* </div> */}
            </div>
            <div>
                <Card>
                    <p>Hola4</p>
                </Card>
            </div>
        </div>
    )
}
