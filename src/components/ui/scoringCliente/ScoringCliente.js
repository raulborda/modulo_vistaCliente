import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Tabs, Card } from 'antd';
import './scoringCliente.css';
import Historico from "./Historico";
import axios from 'axios';

export const ScoringCliente = () => {
  const URL = process.env.REACT_APP_URL;

  const { idCliente, usu } = useContext(GlobalContext);

  const [nosis, setNosis] = useState({});
  const [score, setScore] = useState([]);

  const items = [
    {
      key: '1',
      label: 'Nosis actual',
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

          <Card className="card-nosis-actual">
            <div className="card-nosis-actual-value">
              {nosis?.sco_score}
            </div>
            <div>
              SCORE
            </div>
          </Card>

          <Card className="card-nosis-actual">
            <div className="card-nosis-actual-value">
              {nosis?.sco_situacion_banco}
            </div>
            <div>
              Situación en banco
            </div>
          </Card>

          <Card className="card-nosis-actual">
            <div className="card-nosis-actual-value">
              {nosis?.sco_cheques_nopag}
            </div>
            <div>
              Cheques rechazados
            </div>
          </Card>

        </div>
      ),
    },
    {
      key: '2',
      label: 'Histórico',
      children: (<Historico score={score} />),
    }
  ];

  const onChange = key => {
    // console.log(key);
  };

  useEffect(() => {
    const fetchScoring = async () => {
      try {
        const res = await getScoring(idCliente, URL);

        // console.log("Scoring res.data:", res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          setNosis(res.data[0]);
        };

      } catch (error) {
        console.error("Error al obtener el scoring:", error);
      };
    };

    const fetchScore = async () => {
      try {
        const res = await getScore(idCliente, URL);

        // console.log("Score res.data:", res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          setScore(res.data);
        };

      } catch (error) {
        console.error("Error al obtener el scoring:", error);
      };
    };

    if (idCliente) {
      fetchScoring();
      fetchScore();
    };
  }, [idCliente]);


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


const getScoring = async (idCliente, URL) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${URL}modulos/cli_traer_scoring.php?tipoScoring=nosis&idCli=${idCliente}`,
      //url: `http://10.1.50.57/duoc/server/clientes/cli_traer_scoring.php?tipoScoring=nosis&idCli=${idCliente}`,
      headers: {
        //Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    };

    const res = axios.request(config);

    return await res;
  } catch (error) {
    console.log(error);
  };
};

const getScore = async (idCliente, URL) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${URL}modulos/cli_graph_score.php?tipoScoring=nosis&idCli=${idCliente}`,
      //url: `http://10.1.50.57/duoc/server/clientes/cli_graph_score.php?tipoScoring=nosis&idCli=${idCliente}`,
      headers: {
        //Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    };

    const res = axios.request(config);

    return await res;
  } catch (error) {
    console.log(error);
  };
};


export default ScoringCliente;
