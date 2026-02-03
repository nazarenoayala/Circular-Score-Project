import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AuthContext } from '../../context/AuthContext/AuthContext';


const SimpleBarChart = ({currentScore, sectorScore, globalScore}) => {
  
  
  const {prevTestScore} = useContext(AuthContext);

  const data = [
    {
      name: 'Previo',
      propio: 40,
      comparacion: parseInt(prevTestScore?.testRes),
      amt: 100,
    },
    {
      name: 'Por sector',
      propio: 50,
      comparacion: 50,
      amt: 100,
    },
    {
      name: 'Global',
      propio: 50,
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
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="comparacion" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="propio" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      </BarChart>
  );
};

export default SimpleBarChart;