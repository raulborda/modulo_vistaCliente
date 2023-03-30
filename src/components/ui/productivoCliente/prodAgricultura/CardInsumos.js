import { ArrowUpOutlined, CaretUpFilled } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useState } from 'react';
import CountUp from 'react-countup';

const CardInsumos = () => {

    const [cardStyle1, setCardStyle1] = useState({});
    const [cardStyle2, setCardStyle2] = useState({});
    const [cardStyle3, setCardStyle3] = useState({});
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const handleClick = (index) => {
        // Actualiza el estilo de la tarjeta actualmente seleccionada
        switch (index) {
            case 0:
                setCardStyle1({ border: '2px dashed #56D75B', height: '100%' });
                break;
            case 1:
                setCardStyle2({ border: '2px dashed #56D75B', height: '100%' });
                break;
            case 2:
                setCardStyle3({ border: '2px dashed #56D75B', height: '100%' });
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

    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <>
            <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card className='cardAgricultura'
                    style={cardStyle1} onClick={() => handleClick(0)}
                >

                    <Row gutter={16} >
                        <Col span={12}>
                            <Row>
                                <Statistic
                                    title="Total Has."
                                    value={21.910}
                                    // precision={2}
                                    valueStyle={{
                                        fontSize: '50px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                    // style={{width: '100%'}}
                                />
                                <Statistic
                                    // title="."
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{
                                        color: '#3f8600',
                                        marginTop: '34px',
                                        // marginLeft: '-20px'
                                    }}
                                    // prefix={ <ArrowUpOutlined />}
                                    prefix="("
                                    suffix={(
                                        <span>) <CaretUpFilled /></span>
                                      )}
                                />
                            </Row>
                        </Col>
                        {/* <Col span={12}>
                            <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
                        </Col> */}
                    </Row>

                </Card>
            </div>
            <div style={{ height: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card className='cardAgricultura'
                    style={cardStyle2} onClick={() => handleClick(1)}
                >
                </Card>
            </div>
            <div style={{ height: '100%' }}>
                <Card className='cardAgricultura'
                    style={cardStyle3} onClick={() => handleClick(2)}
                >
                </Card>
            </div>
        </>
    )
}

export default CardInsumos;