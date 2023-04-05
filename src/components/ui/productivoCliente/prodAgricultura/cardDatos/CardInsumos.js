import { ArrowUpOutlined, CaretUpFilled, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlobalContext } from '../../../../context/GlobalContext';
import CardGraficoEvolucionProductiva from './CardGraficoEvolucionProductiva';
import './cardDatos.css';

const items = [
    {
        key: '1',
        label: `TOTAL`,
        children: `Total 1`,
    },
    {
        key: '2',
        label: `SOJA`,
        children: `Soja 2`,
    },
    {
        key: '3',
        label: `TRIGO`,
        children: `Trigo 3`,
    },
    {
        key: '4',
        label: `MAIZ`,
        children: `Maiz 4`,
    },
    {
        key: '5',
        label: `OTROS GRANOS`,
        children: `Otros granos 5`,
    },

];

const CardInsumos = () => {

    const URL = process.env.REACT_APP_URL;
    // console.log('URL: ', URL);

    const {
        cardSelected,
        setCardSelected,
        idCliente,
        setIdCliente,

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



    } = useContext(GlobalContext);

    const [cardStyle1, setCardStyle1] = useState({});
    const [cardStyle2, setCardStyle2] = useState({});
    const [cardStyle3, setCardStyle3] = useState({});
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    // const [labelListTotalHas, setLabelListTotalHas] = useState(false);
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
    // dataForChart.forEach((d) => {
    //     d.total = d.ahxs_propias + d.ahxs_alquiladas; // Agrega la propiedad `total` con la suma de `propias` y `alquiladas`
    // });
    /*-----------------*/

    //!  /*---------INICIO - EVOLUCION PRODUCTIVA---------*/    
    //*Llama y trae los datos de la consulta php

    function InfoGrafEvol(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch('../com_graEvolucionData.php', {
        fetch(`${URL}com_graEvolucionData.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                var objetoData = JSON.parse(data);
                console.log('objetoData: ', objetoData);
                setInfoEvo(objetoData);

            });
            console.log('infoEvo1: ', infoEvo);
        });
    }

    useEffect(() => {
        InfoGrafEvol('2049');
        // InfoGrafEvol(idCliente);
    }, [])

    useEffect(() => {
        if (infoEvo.length > 0) {
            setDataForChart(
                infoEvo.map((item) => {
                    return {
                        cosecha: item.acos_desc,
                        propias: item.ahxs_propias,
                        alquiladas: item.ahxs_alquiladas,
                        total: (parseInt(item.ahxs_propias) + parseInt(item.ahxs_alquiladas)).toString(),
                    };
                })
            );
            console.log('infoEvo3: ', infoEvo);
            console.log('DataForChart: ', dataForChart);
        }
    }, [infoEvo]);

    //!  /*---------FIN - EVOLUCION PRODUCTIVA---------*/


    //!  /*---------INICIO - INSUNMOS---------*/

    /*------------------Inicio DataTotal----------------------*/
    //*Llama y trae los datos de la consulta php
    function InfoInsumosTotales(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_insumoTotal.php", {
        fetch(`${URL}gra_insumoTotal.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisTotal.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoInsumoTotal(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataTotal cuando el componente se monta y cuando el ID del cliente cambia.
        InfoInsumosTotales(idCliente);
    }, [idCliente]);

    // const [isDataInsumoTotal, setIsDataInsumoTotal] = useState([]);
    useEffect(() => {
        if (infoInsumoTotal.length > 0) {
            setIsDataInsumoTotal(
                infoInsumoTotal.map((item) => {
                    return {
                        cosecha: item.eje,
                        Compra: item.imp2,
                        Estimado: item.cos_est,
                        Porcentaje: '(' + (parseInt(item.cos_est) !== 0 ? ((parseInt(item.imp2) * 100 / parseInt(item.cos_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
        // console.log("infoInsumoTotal2: ", infoInsumoTotal)
        // console.log("isDataInsumoTotal2: ", isDataInsumoTotal)
    }, [infoInsumoTotal]);
    /*------------------Fin DataTotal----------------------*/

    /*------------------Inicio DataAgroquimicos----------------------*/
    //*Llama y trae los datos de la consulta php
    function InfoInsumosAgroquimicos(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_insumoAgroquimicos.php", {
        fetch(`${URL}gra_insumoAgroquimicos.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisTotal.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoInsumoAgroquimicos(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataTotal cuando el componente se monta y cuando el ID del cliente cambia.
        InfoInsumosAgroquimicos(idCliente);
    }, [idCliente]);

    // const [isDataInsumoAgroquimicos, setIsDataInsumoAgroquimicos] = useState([]);
    useEffect(() => {
        if (infoInsumoAgroquimicos.length > 0) {
            setIsDataInsumoAgroquimicos(
                infoInsumoAgroquimicos.map((item) => {
                    return {
                        cosecha: item.eje,
                        Compra: item.imp2,
                        Estimado: item.cos_est,
                        Porcentaje: '(' + (parseInt(item.cos_est) !== 0 ? ((parseInt(item.imp2) * 100 / parseInt(item.cos_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoInsumoAgroquimicos]);
    /*------------------Fin DataAgroquimicos----------------------*/

    /*------------------Inicio DataSemillas----------------------*/
    //*Llama y trae los datos de la consulta php
    function InfoInsumosSemillas(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_insumoSemillas.php", {
        fetch(`${URL}gra_insumoSemillas.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisTotal.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoInsumoSemillas(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataTotal cuando el componente se monta y cuando el ID del cliente cambia.
        InfoInsumosSemillas(idCliente);
    }, [idCliente]);

    // const [isDataInsumoSemillas, setIsDataInsumoSemillas] = useState([]);
    useEffect(() => {
        if (infoInsumoSemillas.length > 0) {
            setIsDataInsumoSemillas(
                infoInsumoSemillas.map((item) => {
                    return {
                        cosecha: item.eje,
                        Compra: item.imp2,
                        Estimado: item.cos_est,
                        Porcentaje: '(' + (parseInt(item.cos_est) !== 0 ? ((parseInt(item.imp2) * 100 / parseInt(item.cos_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoInsumoSemillas]);
    /*------------------Fin DataSemillas----------------------*/

    /*------------------Inicio DataFertilizantes----------------------*/
    //*Llama y trae los datos de la consulta php
    function InfoInsumosFertilizantes(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_insumoFertilizantes.php", {
        fetch(`${URL}gra_insumoFertilizantes.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisTotal.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoInsumoFertilizantes(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataTotal cuando el componente se monta y cuando el ID del cliente cambia.
        InfoInsumosFertilizantes(idCliente);
    }, [idCliente]);

    // const [isDataInsumoFertilizantes, setIsDataInsumoFertilizantes] = useState([]);
    useEffect(() => {
        if (infoInsumoFertilizantes.length > 0) {
            setIsDataInsumoFertilizantes(
                infoInsumoFertilizantes.map((item) => {
                    return {
                        cosecha: item.eje,
                        Compra: item.imp2,
                        Estimado: item.cos_est,
                        Porcentaje: '(' + (parseInt(item.cos_est) !== 0 ? ((parseInt(item.imp2) * 100 / parseInt(item.cos_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoInsumoFertilizantes]);
    /*------------------Fin DataFertilizantes----------------------*/

    //!  /*---------FIN - INSUNMOS---------*/

    //!  /*---------INICIO - ACOPIO---------*/

    /*------------------Inicio DataTotal----------------------*/
    //*Llama y trae los datos de la consulta php
    function InfoDataTotal(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_analisisTotal.php", {
        fetch(`${URL}gra_analisisTotal.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisTotal.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoTotal(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataTotal cuando el componente se monta y cuando el ID del cliente cambia.
        InfoDataTotal(idCliente);
    }, [idCliente]);

    // const [isDataTotal, setIsDataTotal] = useState([]);
    useEffect(() => {
        if (infoTotal.length > 0) {
            setIsDataTotal(
                infoTotal.map((item) => {
                    const entregadas = item.kil === 0 ? 0 : item.kil;
                    const encuesta = item.tt_est === 0 ? 0 : item.tt_est;
                    return {
                        cosecha: item.acos_desc,
                        Entregadas: entregadas,
                        Encuesta: encuesta,
                        Porcentaje: '(' + (parseInt(item.tt_est) !== 0 ? ((parseInt(item.kil) * 100 / parseInt(item.tt_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoTotal]);
    /*------------------Fin DataTotal----------------------*/

    /*------------------Inicio DataSoja----------------------*/
    function InfoDataSoja(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_analisisSoja.php", {
        fetch(`${URL}gra_analisisSoja.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisSoja.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoSoja(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataSoja cuando el componente se monta y cuando el ID del cliente cambia.
        InfoDataSoja(idCliente);
    }, [idCliente]);

    // const [isDataSoja, setIsDataSoja] = useState([]);
    useEffect(() => {
        if (infoSoja.length > 0) {
            setIsDataSoja(
                infoSoja.map((item) => {
                    const entregadas = item.kil === 0 ? 0 : item.kil;
                    const encuesta = item.tt_est === 0 ? 0 : item.tt_est;
                    return {
                        cosecha: item.acos_desc,
                        Entregadas: entregadas,
                        Encuesta: encuesta,
                        Porcentaje: '(' + (parseInt(item.tt_est) !== 0 ? ((parseInt(item.kil) * 100 / parseInt(item.tt_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoSoja]);
    /*------------------Fin DataSoja----------------------*/


    /*------------------Inicio DataTrigo----------------------*/
    function InfoDataTrigo(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_analisisTrigo.php", {
        fetch(`${URL}gra_analisisTrigo.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisTrigo.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoTrigo(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataSoja cuando el componente se monta y cuando el ID del cliente cambia.
        InfoDataTrigo(idCliente);
    }, [idCliente]);

    // const [isDataTrigo, setIsDataTrigo] = useState([]);
    useEffect(() => {
        if (infoTrigo.length > 0) {
            setIsDataTrigo(
                infoTrigo.map((item) => {
                    const entregadas = item.kil === 0 ? 0 : item.kil;
                    const encuesta = item.tt_est === 0 ? 0 : item.tt_est;
                    // const porcentaje = encuesta === 0 ? 0 : ((entregadas * 100 / encuesta).toFixed(0));
                    return {
                        cosecha: item.acos_desc,
                        Entregadas: entregadas,
                        Encuesta: encuesta,
                        Porcentaje: '(' + (parseInt(item.tt_est) !== 0 ? ((parseInt(item.kil) * 100 / parseInt(item.tt_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoTrigo]);
    /*------------------Fin DataTrigo----------------------*/


    /*------------------Inicio DataMaiz----------------------*/
    function InfoDataMaiz(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_analisisMaiz.php", {
        fetch(`${URL}gra_analisisMaiz.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisMaiz.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoMaiz(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataMaiz cuando el componente se monta y cuando el ID del cliente cambia.
        InfoDataMaiz(idCliente);
    }, [idCliente]);

    // const [isDataMaiz, setIsDataMaiz] = useState([]);
    useEffect(() => {
        if (infoMaiz.length > 0) {
            setIsDataMaiz(
                infoMaiz.map((item) => {
                    const entregadas = item.kil === 0 ? 0 : item.kil;
                    const encuesta = item.tt_est === 0 ? 0 : item.tt_est;
                    // const porcentaje = encuesta === 0 ? 0 : ((entregadas * 100 / encuesta).toFixed(0));
                    return {
                        cosecha: item.acos_desc,
                        Entregadas: entregadas,
                        Encuesta: encuesta,
                        Porcentaje: '(' + (parseInt(item.tt_est) !== 0 ? ((parseInt(item.kil) * 100 / parseInt(item.tt_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoMaiz]);
    /*------------------Fin DataMaiz----------------------*/

    /*------------------Inicio DataOtrosGranos----------------------*/
    function InfoDataOtrosGranos(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../gra_analisisOtrosGranos.php", {
        fetch(`${URL}gra_analisisOtrosGranos.php`, {
            // fetch("http://10.0.0.28/tati/modulos/gra_analisisOtrosGranos.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp.substring(resp.indexOf('['));
                var objetoData = JSON.parse(data);
                setInfoOtrosGranos(objetoData);
            });
        });
    }

    useEffect(() => {
        // Llama a la función InfoDataSoja cuando el componente se monta y cuando el ID del cliente cambia.
        InfoDataOtrosGranos(idCliente);
    }, [idCliente]);

    // const [isDataOtrosGranos, setIsDataOtrosGranos] = useState([]);
    useEffect(() => {
        if (infoOtrosGranos.length > 0) {
            setIsDataOtrosGranos(
                infoOtrosGranos.map((item) => {
                    const entregadas = item.kil === 0 ? 0 : item.kil;
                    const encuesta = item.tt_est === 0 ? 0 : item.tt_est;
                    // const porcentaje = encuesta === 0 ? 0 : ((entregadas * 100 / encuesta).toFixed(0));
                    return {
                        cosecha: item.acos_desc,
                        Entregadas: entregadas,
                        Encuesta: encuesta,
                        Porcentaje: '(' + (parseInt(item.tt_est) !== 0 ? ((parseInt(item.kil) * 100 / parseInt(item.tt_est)).toFixed(0)) : 0) + '%)'
                    };
                })
            );
        }
    }, [infoOtrosGranos]);
    /*------------------Fin DataOtrosGranos----------------------*/
    //!  /*---------FIN - ACOPIO---------*/


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
                            <CardGraficoEvolucionProductiva />
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
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px' }}>
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
                                    // onMouseOver={() => setLabelListInsumos(true)}
                                    // onMouseOut={() => setLabelListInsumos(false)}
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
                                        // label={labelListInsumos ? (props) => props.value : null}
                                        >
                                            {/* {labelListInsumos ? <LabelList dataKey="total" position="top" style={{ fontSize: '12px' }} /> : null} */}
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
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px' }}>
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
                                    // onMouseOver={() => setLabelListAcopio(true)}
                                    // onMouseOut={() => setLabelListAcopio(false)}
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
                                        // label={labelListAcopio ? (props) => props.value : null}
                                        >
                                            {/* {labelListAcopio ? <LabelList dataKey="total" position="top" style={{ fontSize: '12px' }} /> : null} */}
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