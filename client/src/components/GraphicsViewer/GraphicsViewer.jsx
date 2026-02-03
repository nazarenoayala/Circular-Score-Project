import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SimpleBarChart from '../BarChart/BarChart';

import './graphicsViewer.css';
import { fetchData } from '../../../helpers/axiosHelper';
const GraphicsViewer = () => {
  
  const {token} = useContext(AuthContext);
  
  const [currentScore, setCurrentScore] = useState();
  const [sectorScore, setSectorGr] = useState();
  const [globalScore, setGlobalGr] = useState();

  /* useEffect(() => {
    const getChartsData = async () => {

      try {
        
        let result = await fetchData('/statistics/oneTestResults', 'GET', null, token);
      } catch (error) {
        console.log(error);
      }
    }
    getChartsData();
  }) */

  return (
    <>
      <SimpleBarChart
        chartData={[currentScore, sectorScore, globalScore]}
      />
    </>
  )
}

export default GraphicsViewer