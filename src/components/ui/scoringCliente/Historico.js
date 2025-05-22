import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Tabs } from 'antd';
import './scoringCliente.css';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';


export const Historico = ({ score }) => {

  const { idCliente, usu } = useContext(GlobalContext);

  const categories = score?.map(item => item.fecha);
  const dataScore = score?.map(item => Number(item.sco_score));
  const dataBanco = score?.map(item => Number(item.sco_situacion_banco));
  const dataCheque = score?.map(item => Number(item.sco_cheques_nopag));



  const optionsScore = {
    chart: {
      type: 'column',
    },
    title: {
      useHTML: true,
      text: `
      <span style="font-size: 13px; font-weight: normal; color: #000000;">
        Scoring
      </span><br>
      <span style="font-size: 13px; font-weight: normal; color: #666666;">
        Fuente: Veraz
      </span>
    `,
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        useHTML: true,
        text: `
      <span style="font-size: 13px; font-weight: normal; color: #666666;">
        score
      </span>
    `,
      },
    },
    series: [
      {
        name: 'Score',
        data: dataScore,
        color: '#85C1E9',
      },
    ],
    lang: {
      printChart: "Imprimir gráfico",
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            'printChart',
          ]
        }
      }
    },
  };

  const optionsBanco = {
    chart: {
      type: 'column',
    },
    title: {
      useHTML: true,
      text: `
      <span style="font-size: 13px; font-weight: normal; color: #000000;">
        Situación banco
      </span><br>
      <span style="font-size: 13px; font-weight: normal; color: #666666;">
        Fuente: NOSIS
      </span>
    `,
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        useHTML: true,
        text: `
      <span style="font-size: 13px; font-weight: normal; color: #666666;">
        score
      </span>
    `,
      },
    },
    series: [
      {
        name: 'Situación en Banco',
        data: dataBanco,
        color: '#85C1E9',
      },
    ],
    lang: {
      printChart: "Imprimir gráfico",
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            'printChart',
          ]
        }
      }
    },
  };

  const optionsCheques = {
    chart: {
      type: 'column',
    },
    title: {
      useHTML: true,
      text: `
      <span style="font-size: 13px; font-weight: normal; color: #000000;">
        Cantidad de Cheques no pagados
      </span><br>
      <span style="font-size: 13px; font-weight: normal; color: #666666;">
        Fuente: NOSIS
      </span>
    `,
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        useHTML: true,
        text: `
      <span style="font-size: 13px; font-weight: normal; color: #666666;">
        Cantidad de cheques
      </span>
    `,
      },
    },
    series: [
      {
        name: 'Cantidad',
        data: dataCheque,
        color: '#85C1E9',
      },
    ],
    lang: {
      printChart: "Imprimir gráfico",
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            'printChart',
          ]
        }
      }
    },
  };

  const items = [
    {
      key: '1',
      label: 'Score',
      children: (
        <HighchartsReact highcharts={Highcharts} options={optionsScore} />
      ),
    },
    {
      key: '2',
      label: 'Situación banco',
     children: (
        <HighchartsReact highcharts={Highcharts} options={optionsBanco} />
      ),
    },
    {
      key: '3',
      label: 'Cheques rechazados',
      children: (
        <HighchartsReact highcharts={Highcharts} options={optionsCheques} />
      ),
    }
  ];

  const onChange = key => {
    // console.log(key);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="tabs-custom"
      />
    </>
  );
};

export default Historico;
