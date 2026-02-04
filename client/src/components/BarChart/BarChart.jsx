import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AuthContext } from '../../context/AuthContext/AuthContext';


import './barChart.css'
const SimpleBarChart = ({sectorScore, globalScore}) => {
  
  // Recuperamos la puntuación ya procesada desde el authcontext, que recogimos del último test realizado antes que el actual, además de los datos de las respuestas del actual
  const {prevTestScore, currentTestScore} = useContext(AuthContext);

  // Sumamos todos los valores para después dividirlo por en número de preguntas
  const currentResult = currentTestScore.answers
                        .reduce((tot, num)=>{return tot + num},0) * 100 / (currentTestScore.count * 5);
  console.log("resultado procesado", currentResult  );
  
  

  const data = [
    {
      name: 'Previo',
      propio: currentResult,
      comparacion: parseInt(prevTestScore?.testRes),
      amt: 100,
    },
    {
      name: 'Por sector',
      propio: currentResult,
      comparacion: 50,
      amt: 100,
    },
    {
      name: 'Global',
      propio: currentResult,
      comparacion: 50,
      amt: 100,
    },
  ];



  return (

    <BarChart
      style={{ width: '100%', maxWidth: '700px',  maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis fontSize={'1.5rem'} fontWeight={'bold'} dataKey="name" />
      <YAxis fontSize={'1.5rem'} fontWeight={'bold'} width="auto" />
      <Tooltip />
      <Legend align='left' iconSize={'24px'} iconType='circle' layout='horizontal'/>
      <Bar dataKey="comparacion" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      <Bar  dataKey="propio" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
      </BarChart>
  );
};

export default SimpleBarChart;