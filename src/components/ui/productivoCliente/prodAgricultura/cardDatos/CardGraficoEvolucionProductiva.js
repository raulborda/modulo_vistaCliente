import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../context/GlobalContext';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CardGraficoEvolucionProductiva = () => {

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
    } = useContext(GlobalContext);
    const [labelListTotalHas, setLabelListTotalHas] = useState(false);

    // //!  /*---------INICIO - EVOLUCION PRODUCTIVA---------*/






    // //!  /*---------FIN - EVOLUCION PRODUCTIVA---------*/
    // const [labelListTotalHas, setLabelListTotalHas] = useState(false);
    // console.log(labelListTotalHas);



    const data = [
        {
            name: 'Page A',
            uv: 75,
            pv: 50,
        },
    ];
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-10px' }}>
                <ResponsiveContainer width="100%" height={100} layout="vertical">
                    <BarChart
                        height={100}
                        data={dataForChart.slice(-4)}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                        onMouseOver={() => setLabelListTotalHas(true)}
                        onMouseOut={() => setLabelListTotalHas(false)}
                    >
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
                            label={labelListTotalHas ? (dataForChart) => dataForChart.total : null}
                        >
                            {labelListTotalHas ? <LabelList dataKey='total' position="top" style={{ fontSize: '12px' }} /> : null}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default CardGraficoEvolucionProductiva;
