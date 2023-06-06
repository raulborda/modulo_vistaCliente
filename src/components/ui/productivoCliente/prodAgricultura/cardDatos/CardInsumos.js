import { CaretDownOutlined, CaretUpFilled, CheckCircleOutlined, DotChartOutlined, EnvironmentOutlined, SmileFilled, SmileOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Spin, Statistic } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { GlobalContext } from '../../../../context/GlobalContext';
import CardGraficoEvolucionProductiva from './CardGraficoEvolucionProductiva';
import './cardDatos.css';

import ReactMapboxGl, { Marker, LngLatBounds } from 'react-mapbox-gl';
import * as MapboxGl from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from 'mapbox-gl-geocoder';
import MapboxGeocoder from 'mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import MapasLotes from '../MapasLotes';



// console.log(MapboxGl); // Verifica que LngLatBounds está incluido en las exportaciones
const CardInsumos = () => {

    const URL = process.env.REACT_APP_URL;
    // console.log('URL: ', URL);

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

        setIconTable,

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
        visible, setVisible,



    } = useContext(GlobalContext);

    const [cardStyle1, setCardStyle1] = useState({
        // borderLeft: '2px dashed #56D75B',
        // borderTop: '2px dashed #56D75B',
        // borderBottom: '2px dashed #56D75B',
        // borderRight: '0px dashed #FFFF',
        // borderTopRightRadius: '0%',
        // borderBottomRightRadius: '0%',
        border: '2px dashed #56D75B',
        height: '100%',
    });
    const [cardStyle2, setCardStyle2] = useState({
        // borderRight: '2px dashed #56D75B',
        // borderTopRightRadius: '0%',
        // border: '2px dashed #56D75B',
        height: '100%'
    });
    const [cardStyle3, setCardStyle3] = useState({
        // borderRight: '2px dashed #56D75B',
        // borderTopRightRadius: '0%',
        // borderBottomRightRadius: '0%',
        // border: '2px dashed #56D75B',
        height: '100%'
    });
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [totalHas, setTotalHas] = useState(0);
    const [totalHasAA, setTotalHasAA] = useState(0);
    const [insumoTotal, setInsumoTotal] = useState(0);
    const [insumoTotalAA, setInsumoTotalAA] = useState(0);
    const [acopioTotal, setAcopioTotal] = useState(0);
    const [acopioTotalAA, setAcopioTotalAA] = useState(0);
    const [average, setAverage] = useState();
    const [averageInsumos, setAverageInsumos] = useState();
    const [averageAcopio, setAverageAcopio] = useState();
    const [porcentajeColor, setPorcentajeColor] = useState('');
    const [porcentajeColorInsumo, setPorcentajeColorInsumo] = useState('');
    const [porcentajeColorAcopio, setPorcentajeColorAcopio] = useState('');
    const [valorPropias, setValorPropias] = useState(0);
    const [valorAlquiladas, setValorAlquiladas] = useState(0);
    const [insumoEstimado, setInsumoEstimado] = useState(0);
    const [acopioEncuesta, setAcopioEncuesta] = useState(0);
    // setCardSelected(0);


    // const [labelListTotalHas, setLabelListTotalHas] = useState(false);
    const [labelListInsumos, setLabelListInsumos] = useState(false);
    const [labelListAcopio, setLabelListAcopio] = useState(false);


    // setCardStyle1({ border: '2px dashed #56D75B', height: '100%' });
    const handleClick = (index) => {
        // Actualiza el estilo de la tarjeta actualmente seleccionada
        switch (index) {
            case 0:
                setCardStyle1({
                    // borderLeft: '2px dashed #56D75B',
                    // borderTop: '2px dashed #56D75B',
                    // borderBottom: '2px dashed #56D75B',
                    // borderRight: '0px dashed #FFFF',
                    // borderTopRightRadius: '0%',
                    // borderBottomRightRadius: '0%',
                    border: '2px dashed #56D75B',
                    height: '100%',
                });
                setCardStyle2({})
                setCardStyle3({})
                setCardSelected(0);
                // setCardStyle2({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', height: '100%' });
                // setCardStyle3({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', height: '100%' });
                break;
            case 1:
                setCardStyle2({
                    // borderLeft: '2px dashed #56D75B',
                    // borderTop: '2px dashed #56D75B',
                    // borderBottom: '2px dashed #56D75B',
                    // borderRight: '0px dashed #FFFF',
                    // borderTopRightRadius: '0%',
                    // borderBottomRightRadius: '0%',
                    border: '2px dashed #56D75B',
                    height: '100%'
                });
                setCardStyle1({})
                setCardStyle3({})
                // setCardStyle1({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', height: '100%' });
                // setCardStyle3({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', height: '100%' });
                setCardSelected(2);
                setIconTable(false);
                break;
            case 2:
                setCardStyle3({
                    // borderLeft: '2px dashed #56D75B',
                    // borderTop: '2px dashed #56D75B',
                    // borderBottom: '2px dashed #56D75B',
                    // borderRight: '0px dashed #FFFF',
                    // borderTopRightRadius: '0%',
                    // borderBottomRightRadius: '0%',
                    border: '2px dashed #56D75B',
                    height: '100%'
                });
                setCardStyle1({})
                setCardStyle2({})
                // setCardStyle1({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', height: '100%' });
                // setCardStyle2({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', height: '100%' });
                setCardSelected(3);
                setIconTable(false);
                break;
            default:
                break;
        }

        // Deselecciona la tarjeta anteriormente seleccionada
        if (selectedCardIndex !== null && selectedCardIndex !== index) {
            switch (selectedCardIndex) {
                case 0:
                    // setCardStyle1({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%' });
                    setCardStyle1({});
                    break;
                case 1:
                    // setCardStyle2({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%' });
                    setCardStyle2({});
                    break;
                case 2:
                    // setCardStyle3({ borderRight: '2px dashed #56D75B', borderTopRightRadius: '0%', borderBottomRightRadius: '0%' });
                    setCardStyle3({});
                    break;
                default:
                    break;
            }
        }

        // Actualiza el índice de la tarjeta actualmente seleccionada
        setSelectedCardIndex(index);
    };

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


    //!  /*---------INICIO - EVOLUCION PRODUCTIVA---------*/    
    // //*Llama y trae los datos de la consulta php

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
                // console.log('objetoData: ', objetoData);
                setInfoEvo(objetoData);

            });
            // console.log('infoEvo1: ', infoEvo);
        });
    }

    useEffect(() => {
        // InfoGrafEvol('2049');
        InfoGrafEvol(idCliente);
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
            // console.log('infoEvo3: ', infoEvo);
            // console.log('DataForChart: ', dataForChart);
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
                console.log('infoInsumoTotal: ', infoInsumoTotal);
                console.log('objetoData - infoInsumoTotal: ', objetoData);
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
                // console.log('InfoTotal: ', infoTotal)
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
            // console.log('setIsDataTotal: ', isDataTotal)
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



    function calculateTotal() {

        //! INICIO - EVOLUCION PRODUCTIVA
        const filteredInfoEvo = infoEvo.find((item) => item.acos_desc === selectedAcosDesc);
        // console.log('filteredInfoEvo: ',filteredInfoEvo)
        const vPropias = filteredInfoEvo ? parseInt(filteredInfoEvo.ahxs_propias) : 0;
        const vAlquiladas = filteredInfoEvo ? parseInt(filteredInfoEvo.ahxs_alquiladas) : 0;
        const total = filteredInfoEvo ? (parseInt(filteredInfoEvo.ahxs_propias) + parseInt(filteredInfoEvo.ahxs_alquiladas)) : 0;
        // console.log('totaltotal: ',total)
        // setValorAlquiladas(parseInt(filteredInfoEvo.ahxs_alquiladas));
        const selectCosechaAnterior = infoEvo.find((item) => item.acos_desc === cosechaAnterior);
        const totalCosechaAnterior = selectCosechaAnterior ? (parseInt(selectCosechaAnterior.ahxs_propias) + parseInt(selectCosechaAnterior.ahxs_alquiladas)) : 0;

        setValorPropias(vPropias);
        setValorAlquiladas(vAlquiladas);
        setTotalHasAA(totalCosechaAnterior);
        setTotalHas(total);
        //! FIN - EVOLUCION PRODUCTIVA

        //! INICIO - INSUMOS
        const filteredInfoInsumoTotal = isDataInsumoTotal.find((item) => item.cosecha === selectedAcosDesc);
        const totalInsumos = filteredInfoInsumoTotal ? parseInt(filteredInfoInsumoTotal.Compra) : 0;

        const selectCosechaAnteriorInsumoTotal = isDataInsumoTotal.find((item) => item.cosecha === cosechaAnterior);
        const totalCosechaAnteriorInsumoTotal = selectCosechaAnteriorInsumoTotal ? parseInt(selectCosechaAnteriorInsumoTotal.Compra) : 0;

        setInsumoTotal(totalInsumos);
        setInsumoTotalAA(totalCosechaAnteriorInsumoTotal);

        const estimadoInsumos = filteredInfoInsumoTotal ? parseInt(filteredInfoInsumoTotal.Estimado) : 0;

        setInsumoEstimado(estimadoInsumos);
        //! FIN - INSUMOS

        //! INICIO - ACOPIO TT
        const filteredInfoAcopioTotal = isDataTotal.find((item) => item.cosecha === selectedAcosDesc);
        const totalAcopio = filteredInfoAcopioTotal ? parseInt(filteredInfoAcopioTotal.Entregadas) : 0;

        const selectCosechaAnteriorAcopioTotal = isDataTotal.find((item) => item.cosecha === cosechaAnterior);
        const totalCosechaAnteriorAcopioTotal = selectCosechaAnteriorAcopioTotal ? parseInt(selectCosechaAnteriorAcopioTotal.Entregadas) : 0;

        const encuestaAcopio = filteredInfoAcopioTotal ? parseInt(filteredInfoAcopioTotal.Encuesta) : 0;

        setAcopioEncuesta(encuestaAcopio);

        setAcopioTotal(totalAcopio);
        setAcopioTotalAA(totalCosechaAnteriorAcopioTotal);
        //! FIN - ACOPIO TT
    }


    useEffect(() => {

        //! INICIO - EVOLUCION PRODUCTIVA
        var porcentaje = 0;
        if (totalHasAA === 0 && totalHas === 0) {
            porcentaje = 0
        } else if (totalHasAA === 0)
            porcentaje = 100
        else {
            porcentaje = ((totalHas - totalHasAA) / totalHasAA) * 100;

        }

        setAverage(porcentaje);
        if (porcentaje >= 0) {
            setPorcentajeColor('#0CB112');
        } else {
            setPorcentajeColor('#FA0D0D');
        }
        //! FIN - EVOLUCION PRODUCTIVA

        //! INICIO - INSUMOS
        var porcentajeInsumos = 0;
        if (insumoTotalAA === 0 && insumoTotal === 0) {
            porcentajeInsumos = 0
        } else if (insumoTotalAA === 0)
            porcentajeInsumos = 100
        else {
            porcentajeInsumos = ((insumoTotal - insumoTotalAA) / insumoTotalAA) * 100;

        }

        setAverageInsumos(porcentajeInsumos);
        if (porcentajeInsumos >= 0) {
            setPorcentajeColorInsumo('#0CB112');
        } else {
            setPorcentajeColorInsumo('#FA0D0D');
        }

        //! FIN - INSUMOS

        //! INICIO - ACOPIO TT

        var porcentajeAcopio = 0;
        if (acopioTotalAA === 0 && acopioTotal === 0) {
            porcentajeAcopio = 0
        } else if (acopioTotalAA === 0)
            porcentajeAcopio = 100
        else {
            porcentajeAcopio = ((acopioTotal - acopioTotalAA) / acopioTotalAA) * 100;

        }

        setAverageAcopio(porcentajeAcopio);
        if (porcentajeAcopio >= 0) {
            setPorcentajeColorAcopio('#0CB112');
        } else {
            setPorcentajeColorAcopio('#FA0D0D');
        }
        //! FIN - ACOPIO TT
    }, [totalHas, totalHasAA, insumoTotal, insumoTotalAA, acopioTotal, acopioTotalAA]);

    useEffect(() => {
        calculateTotal();
    }, [infoEvo, selectedAcosDesc, cosechaAnterior])


    //! INICIO - MAPBOX

    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoianVsaXBlcmVsZGEiLCJhIjoiY2xnZ2lqZTR0MDVxMDNjbzY3ZmkyeTg4ZSJ9.tuTXT_-exIErerEPFT9o3g',
    });

    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(11);
    const coordinates = [
        // [-63.09649944, -37.72419139],
        // [-63.0899334, -37.71892979],
        // [-63.08439732, -37.72320699],
        // [-63.09087753, -37.72863799],
        // [-63.09649944, -37.72419139],
        // [-63.09649944, -37.72419139],
        // [-63.09649944, -37.72419139],
        // [-63.09649944, -37.72419139],
        // [-63.09649944, -37.72419139],
        // [-63.09649944, -37.72419139],

        // // Agregar coordenadas cercanas
        // [-63.092242, -37.723432],
        // [-63.091149, -37.725251],
        // [-63.097209, -37.726975]

        [-63.11548948287964, -37.75500450168077],
        [-63.11291992664337, -37.7570996754639],
        [-63.117597699165344, -37.76074700242975],
        [-63.12021017074585, -37.75868586068395],
        [-63.11548948287964, -37.75500450168077]
    ];

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [coordinates],
                },
            },
        ],
    };

    useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = coordinates.reduce(
                (bounds, coord) => bounds.extend(coord),
                new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
            );
            setLng(bounds.getCenter().lng);
            setLat(bounds.getCenter().lat);
        }
        // console.log('coordinates: ', coordinates)
    }, [coordinates]);



    //! FIN - MAPBOX


    return (
        <>
            <div style={{ height: '100%', width: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card className='cardAgricultura'
                    style={cardStyle1} onClick={() => handleClick(0)}
                >
                    <Row gutter={16} >
                        <Col span={8}>
                            <Row style={{ width: '100%' }}>
                                <Statistic
                                    title="Total Has."
                                    value={totalHas ? totalHas : 0}
                                    // value={3500000}
                                    // value={999999}
                                    valueStyle={{
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                />
                                <Statistic
                                    value={average ? Math.abs(average) : 0}
                                    // value={100}
                                    precision={2}
                                    valueStyle={{
                                        color: porcentajeColor,
                                        marginTop: '30px',
                                        marginLeft: '5px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                    }}
                                    prefix="("
                                    suffix={average >= 0 ? <span>%) <CaretUpFilled /></span> : <span>%) <CaretDownOutlined /> </span>}

                                />
                            </Row>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-10px' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', marginRight: '5px' }}>Cosecha anterior:</p>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', color: '#747373' }}>{totalHasAA ? totalHasAA.toLocaleString() : 0}</p>
                            </div>
                        </Col>
                        <Col span={4}>
                            {/* <Row style={{ width: '100%' }}> */}
                            <Row style={{ width: '100%' }}>
                                {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                                <Statistic
                                    title="Propias"
                                    value={valorPropias ? valorPropias : 0}
                                    valueStyle={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    // style={{
                                    //     fontSize: '10px !important',  // Tamaño del título
                                    //     display: 'flex',
                                    //     flexDirection: 'column',
                                    //     marginTop: '0px'
                                    // }}
                                    formatter={formatter}
                                    className="statistic"
                                    layout="horizontal"
                                />
                                {/* </div> */}
                            </Row>
                        </Col>
                        <Col span={5}>
                            {/* <Row style={{ width: '100%' }}> */}
                            <Row style={{ width: '100%' }}>
                                {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                                <Statistic
                                    title="Alquiladas"
                                    value={valorAlquiladas ? valorAlquiladas : 0}
                                    valueStyle={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                />
                                {/* </div> */}
                            </Row>
                        </Col>
                        {/* <Col span={6}> */}
                        <Col span={7}>
                            <Map
                                style="mapbox://styles/mapbox/satellite-streets-v12"
                                containerStyle={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '6px',
                                }}
                                center={[lng, lat]}
                                zoom={[zoom]}
                            >
                                <MapboxGl.GeoJSONLayer
                                    data={geojson}
                                    fillLayout={{ visibility: 'visible' }}
                                    fillPaint={{
                                        'fill-color': 'yellow',
                                        'fill-opacity': 0.4,
                                    }}
                                    center={[lng, lat]}
                                    zoom={[zoom]}
                                />
                                <MapboxGl.GeoJSONLayer
                                    data={geojson}
                                    fillLayout={{ visibility: 'visible' }}
                                    fillPaint={{
                                        'fill-color': 'yellow',
                                        'fill-opacity': 0.4,
                                    }}
                                />
                                {coordinates.map((coordinate, index) => (
                                    <Marker key={index} coordinates={coordinate} anchor="bottom" />
                                ))}
                                <Button style={{ padding: "5px", margin: '4px' }} onClick={() => setVisible(!visible)}>Ver Lotes</Button>
                            </Map>
                        </Col>
                    </Row>
                </Card>
            </div>
            <div style={{ height: '100%', width: '100%', paddingBottom: '5px', backgroundColor: '#FFFF' }}>
                <Card className='cardAgricultura'
                    style={cardStyle2} onClick={() => handleClick(1)}
                >
                    <Row gutter={16} >
                        <Col span={11}>
                            <Row style={{ width: '100%' }}>
                                <Statistic
                                    title="Insumos U$S"
                                    value={insumoTotal ? insumoTotal : 0}
                                    valueStyle={{
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                />
                                <Statistic
                                    value={averageInsumos ? Math.abs(averageInsumos) : 0}
                                    precision={2}
                                    valueStyle={{
                                        color: porcentajeColorInsumo,
                                        marginTop: '30px',
                                        marginLeft: '5px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                    }}
                                    prefix="("
                                    suffix={averageInsumos >= 0 ? <span>%) <CaretUpFilled /></span> : <span>%) <CaretDownOutlined /> </span>}
                                />
                            </Row>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', marginRight: '5px' }}>Campaña anterior:</p>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', color: '#747373' }}>{insumoTotalAA ? insumoTotalAA.toLocaleString() : 0}</p>
                            </div>
                        </Col>
                        <Col span={4}>
                            {/* <Row style={{ width: '100%' }}> */}
                            <Row style={{ width: '100%' }}>
                                {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                                <Statistic
                                    title="Encuesta "
                                    value={insumoEstimado ? insumoEstimado : 0}
                                    valueStyle={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                    layout="horizontal"
                                />
                                {/* </div> */}
                            </Row>
                        </Col>
                        {/* <Col span={6}>
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
                                    >
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
                                        >
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Col> */}
                    </Row>
                </Card>
            </div>
            <div style={{ height: '100%', width: '100%' }}>
                <Card className='cardAgricultura'
                    style={cardStyle3} onClick={() => handleClick(2)}
                >
                    <Row gutter={16} >
                        <Col span={11}>
                            <Row style={{ width: '100%' }}>
                                <Statistic
                                    title="Acopio TT"
                                    value={acopioTotal ? acopioTotal : 0}
                                    valueStyle={{
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                />
                                <Statistic
                                    value={averageAcopio ? Math.abs(averageAcopio) : 0}
                                    precision={2}
                                    valueStyle={{
                                        color: porcentajeColorAcopio,
                                        marginTop: '30px',
                                        fontWeight: 'bold',
                                        marginLeft: '5px',
                                        width: '100%',
                                    }}
                                    prefix="("
                                    suffix={averageAcopio >= 0 ? <span>%) <CaretUpFilled /></span> : <span>%) <CaretDownOutlined /> </span>}
                                />
                            </Row>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', marginRight: '5px' }}>Cosecha anterior:</p>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', color: '#747373' }}>{acopioTotalAA ? acopioTotalAA.toLocaleString() : 0}</p>
                            </div>
                        </Col>
                        <Col span={4}>
                            {/* <Row style={{ width: '100%' }}> */}
                            <Row style={{ width: '100%' }}>
                                {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                                <Statistic
                                    title="Encuesta"
                                    value={acopioEncuesta ? acopioEncuesta : 0}
                                    valueStyle={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',
                                        marginTop: '-20px',
                                        textAlign: 'right'
                                    }}
                                    formatter={formatter}
                                    className="statistic"
                                    layout="horizontal"
                                />
                                {/* </div> */}
                            </Row>
                        </Col>
                        {/* <Col span={6}>
                            <div style={{ marginTop: '-10px' }}> */}
                                {/*0 <ResponsiveContainer width="100%" height={100}>
                                    <BarChart
                                        height={100}
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 0,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                        prefix="("
                                        suffix={averageInsumos >= 0 ? <span>%) <CaretUpFilled /></span> : <span>%) <CaretDownOutlined /> </span>}
                                    />
                                </Row>
                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-12px' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', marginRight: '5px' }}>Año anterior:</p>
                                    <p style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', color: '#747373' }}>{insumoTotalAA ? insumoTotalAA.toLocaleString() : 0}</p>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ marginTop: '-10px' }}>
                                    {/* <ResponsiveContainer width="100%" height={100}>
                                        <BarChart
                                            height={100}
                                            data={data}
                                            margin={{
                                                top: 20,
                                                right: 0,
                                                left: 0,
                                                bottom: 5,
                                            }}
                                        >
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
                                            >
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer> */}
                            {/* </div>
                        </Col> */}
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default CardInsumos;