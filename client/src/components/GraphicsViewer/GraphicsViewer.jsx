import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SimpleBarChart from '../BarChart/BarChart';

import './graphicsViewer.css';
import { fetchData } from '../../../helpers/axiosHelper';
const GraphicsViewer = () => {
  
  const {token} = useContext(AuthContext);
  
  const [sectorAvg, setSectorAvg] = useState();
  const [globalAvg, setGlobalAvg] = useState();

  useEffect(() => {
    const getChartsData = async () => {

      try {
        
        let resultSector = await fetchData('/statistics/sameSectorTests', 'GET', null, token);
        setSectorAvg();

        let resultGlobal = await fetchData('/statistics/globalTests', 'GET', null, token);

        setGlobalAvg();

        
      } catch (error) {
        console.log(error);
      }
    }
    getChartsData();
  }) 

  return (
    <>
      <SimpleBarChart
        chartData={[ sectorScore, globalScore]}
      />
    </>
  )
}

export default GraphicsViewer