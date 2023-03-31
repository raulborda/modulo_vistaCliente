import { ArrowUpOutlined, CaretUpFilled, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import React, { useContext, useState } from 'react';
import CountUp from 'react-countup';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlobalContext } from '../../../context/GlobalContext';

const CardInsumos = () => {

    const {
        cardSelected,
        setCardSelected,
    } = useContext(GlobalContext);

    const [cardStyle1, setCardStyle1] = useState({});
    const [cardStyle2, setCardStyle2] = useState({});
    const [cardStyle3, setCardStyle3] = useState({});
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const [labelListTotalHas, setLabelListTotalHas] = useState(false);
    const [labelListInsumos, setLabelListInsumos] = useState(false);
    const [labelListAcopio, setLabelListAcopio] = useState(false);

    // setCardStyle1({ border: '2px dashed #56D75B', height: '100%' });
    const handleClick = (index) => {
        // Actualiza el estilo de la tarjeta actualmente seleccionada
        switch (index) {
            case 0:
                setCardStyle1({ border: '2px dashed #56D75B', height: '100%' });
                setCardSelected(0);
                break;
            case 1:
                setCardStyle2({ border: '2px dashed #56D75B', height: '100%' });
                setCardSelected(2);
                break;
            case 2:
                setCardStyle3({ border: '2px dashed #56D75B', height: '100%' });
                setCardSelected(3);
                break;
            default:
                break;
        }

        // Deselecciona la tarjeta anteriormente seleccionada
        if (selectedCardIndex !== null && selectedCardIndex !== index) {
            switch (selectedCardIndex) {
                case 0:
                    setCardStyle1({});
                    break;
                case 1:
                    setCardStyle2({});
                    break;
                case 2:
                    setCardStyle3({});
                    break;
                default:
                    break;
            }
        }

        // Actualiza el índice de la tarjeta actualmente seleccionada
        setSelectedCardIndex(index);
    };

    // const handleClick = (index) => {
    //     // Si la card seleccionada es la misma que la que se hizo clic, deselecciona la card
    //     if (selectedCardIndex === index) {
    //         switch (index) {
    //             case 0:
    //                 setCardStyle1({});
    //                 setCardSelected(1);
    //                 break;
    //             case 1:
    //                 setCardStyle2({});
    //                 setCardSelected(1);
    //                 break;
    //             case 2:
    //                 setCardStyle3({});
    //                 setCardSelected(1);
    //                 break;
    //             default:
    //                 break;
    //         }
    //         setSelectedCardIndex(null);
    //     } else {
    //         // Actualiza el estilo de la tarjeta actualmente seleccionada
    //         switch (index) {
    //             case 0:
    //                 setCardStyle1({ border: '2px dashed #56D75B', height: '100%' });
    //                 setCardSelected(0);
    //                 break;
    //             case 1:
    //                 setCardStyle2({ border: '2px dashed #56D75B', height: '100%' });
    //                 setCardSelected(2);
    //                 break;
    //             case 2:
    //                 setCardStyle3({ border: '2px dashed #56D75B', height: '100%' });
    //                 setCardSelected(3);
    //                 break;
    //             default:
    //                 break;
    //         }
    
    //         // Deselecciona la tarjeta anteriormente seleccionada
    //         if (selectedCardIndex !== null && selectedCardIndex !== index) {
    //             switch (selectedCardIndex) {
    //                 case 0:
    //                     setCardStyle1({});
    //                     break;
    //                 case 1:
    //                     setCardStyle2({});
    //                     break;
    //                 case 2:
    //                     setCardStyle3({});
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    
    //         // Actualiza el índice de la tarjeta actualmente seleccionada
    //         setSelectedCardIndex(index);
    //     }
    // };
    

    const formatter = (value) => <CountUp end={value} separator="." />;

    const data = [
        {
            cosecha: '2324',
            propias: 4000,
            alquiladas: 2400,
        },
        {
            cosecha: '2223',
            propias: 3000,
            alquiladas: 1398,
        },
        {
            cosecha: '2122',
            propias: 2000,
            alquiladas: 9800,
        },
        {
            cosecha: '2021',
            propias: 2780,
            alquiladas: 3908,
        }
    ];


    /*----------------*/
    data.forEach((d) => {
        d.total = d.propias + d.alquiladas; // Agrega la propiedad `total` con la suma de `propias` y `alquiladas`
    });


    /*-----------------*/


    return (
        <>
            <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card className='cardAgricultura'
                    style={cardStyle1} onClick={() => handleClick(0)}
                >

                    <Row gutter={16} >
                        <Col span={15}>
                            <Row style={{ width: '100%' }}>
                                <Statistic
                                    title="Total Has."
                                    value={21910}
                                    valueStyle={{
                                        fontSize: '40px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                />
                                <Statistic
                                    // title="."
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{
                                        color: '#0CB112',
                                        marginTop: '30px',
                                        marginLeft: '20px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                    }}
                                    // prefix={ <ArrowUpOutlined />}
                                    prefix="("
                                    suffix={(
                                        <span>%) <CaretUpFilled /></span>
                                    )}
                                />
                            </Row>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif', marginRight: '5px' }}>Año anterior:</p>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif', color: '#747373' }}>90</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ marginTop: '-10px' }}>
                                <ResponsiveContainer width="100%" height={100}>
                                    <BarChart
                                        height={100}
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 0,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                        onMouseOver={() => setLabelListTotalHas(true)}
                                        onMouseOut={() => setLabelListTotalHas(false)}
                                    >
                                        {/* <Tooltip /> */}
                                        <Bar
                                            dataKey="propias"
                                            name="Propias"
                                            stackId="a"
                                            barSize={25}
                                            fill="#B10C5B"
                                            key={"propias"}
                                            isAnimationActive={true}
                                        />
                                        <Bar
                                            dataKey="alquiladas"
                                            name="Alquiladas"
                                            stackId="a"
                                            barSize={25}
                                            fill="#282828"
                                            key={"alquiladas"}
                                            isAnimationActive={true}
                                            label={labelListTotalHas ? (props) => props.value : null}
                                        >
                                            {labelListTotalHas ? <LabelList dataKey="total" position="top" style={{ fontSize: '12px' }} /> : null}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col span={1} >
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '35px', marginLeft: '40px' }}>
                                <EnvironmentOutlined title='Lotes' className='btnEnvironmentOutlined' />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
            <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card className='cardAgricultura'
                    style={cardStyle2} onClick={() => handleClick(1)}
                >
                    <Row gutter={16} >
                        <Col span={15}>
                            <Row style={{ width: '100%' }}>
                                <Statistic
                                    title="Insumos U$S"
                                    value={345020}
                                    // precision={2}
                                    valueStyle={{
                                        fontSize: '40px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                // style={{width: '100%'}}
                                />
                                <Statistic
                                    // title="."
                                    value={10}
                                    precision={2}
                                    valueStyle={{
                                        color: '#0CB112',
                                        marginTop: '30px',
                                        marginLeft: '20px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                        // marginLeft: '-20px'
                                    }}
                                    // prefix={ <ArrowUpOutlined />}
                                    prefix="("
                                    suffix={(
                                        <span>%) <CaretUpFilled /></span>
                                    )}
                                />
                            </Row>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px'  }}>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif', marginRight: '5px' }}>Año anterior:</p>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif', color: '#747373' }}>310.000</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ marginTop: '-10px' }}>
                                <ResponsiveContainer width="100%" height={100}>
                                    <BarChart
                                        height={100}
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 0,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                        onMouseOver={() => setLabelListInsumos(true)}
                                        onMouseOut={() => setLabelListInsumos(false)}
                                    >
                                        {/* <Tooltip /> */}
                                        <Bar
                                            dataKey="propias"
                                            name="Propias"
                                            stackId="a"
                                            barSize={25}
                                            fill="#70DBE2"
                                            key={"propias"}
                                            isAnimationActive={true}
                                        />
                                        <Bar
                                            dataKey="alquiladas"
                                            name="Alquiladas"
                                            stackId="a"
                                            barSize={25}
                                            fill="#3359A3"
                                            key={"alquiladas"}
                                            isAnimationActive={true}
                                            label={labelListInsumos ? (props) => props.value : null}
                                        >
                                            {labelListInsumos ? <LabelList dataKey="total" position="top" style={{ fontSize: '12px' }} /> : null}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col span={3}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                {/* <InfoCircleOutlined className='btnInfoCircleOutlined' /> */}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
            <div style={{ height: '100%' }}>
                <Card className='cardAgricultura'
                    style={cardStyle3} onClick={() => handleClick(2)}
                >
                    <Row gutter={16} >
                        <Col span={15}>
                            <Row style={{ width: '100%' }}>
                                <Statistic
                                    title="Acopio TT"
                                    value={95130}
                                    // precision={2}
                                    valueStyle={{
                                        fontSize: '40px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                />
                                <Statistic
                                    // title="."
                                    value={23}
                                    precision={2}
                                    valueStyle={{
                                        color: '#0CB112',
                                        marginTop: '30px',
                                        fontWeight: 'bold',
                                        marginLeft: '20px',
                                        width: '100%',
                                    }}
                                    prefix="("
                                    suffix={(
                                        <span>%) <CaretUpFilled /></span>
                                    )}
                                />
                            </Row>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px'  }}>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif', marginRight: '5px' }}>Año anterior:</p>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif', color: '#747373' }}>310.000</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ marginTop: '-10px' }}>
                                <ResponsiveContainer width="100%" height={100}>
                                    <BarChart
                                        height={100}
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 0,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                        onMouseOver={() => setLabelListAcopio(true)}
                                        onMouseOut={() => setLabelListAcopio(false)}
                                    >
                                        {/* <Tooltip /> */}
                                        <Bar
                                            dataKey="propias"
                                            name="Propias"
                                            stackId="a"
                                            barSize={25}
                                            fill="#0B780F"
                                            key={"propias"}
                                            isAnimationActive={true}
                                        />
                                        <Bar
                                            dataKey="alquiladas"
                                            name="Alquiladas"
                                            stackId="a"
                                            barSize={25}
                                            fill="#A2E270"
                                            key={"alquiladas"}
                                            isAnimationActive={true}
                                            label={labelListAcopio ? (props) => props.value : null}
                                        >
                                            {labelListAcopio ? <LabelList dataKey="total" position="top" style={{ fontSize: '12px' }} /> : null}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col span={3}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                {/* <InfoCircleOutlined className='btnInfoCircleOutlined' /> */}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default CardInsumos;