import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import { AuthContext } from '../../context/AuthContext/AuthContext';


import './barChart.css'
const SimpleBarChart = ({chartData}) => {
  
  const {sectorAvg, globalAvg} = chartData;

  // Recuperamos la puntuación ya procesada desde el authcontext, que recogimos del último test realizado antes que el actual, además de los datos de las respuestas del actual
  const {prevTestScore, currentTestScore} = useContext(AuthContext);
  
  const data = [
    {
      name: 'Previo',
      Propio: currentTestScore,
      Comparacion: prevTestScore,
      amt: 100,
    },
    {
      name: 'Por sector',
      Propio: currentTestScore,
      Comparacion: sectorAvg,
      amt: 100,
    },
    {
      name: 'Global',
      Propio: currentTestScore,
      Comparacion: globalAvg,
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
      <Legend align='left' iconSize={'20px'} iconType='square' layout='horizontal'/>

      <Bar dataKey="Comparacion" fill="#447EF7" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]}>
        <LabelList dataKey="Comparacion" position="top" />
      </Bar>
      <Bar dataKey="Propio" fill="#00D47E" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]}>
        <LabelList dataKey="Propio" position="top" />
      </Bar>
      </BarChart>
  );
};

export default SimpleBarChart;