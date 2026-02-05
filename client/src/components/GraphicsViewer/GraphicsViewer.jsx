import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SimpleBarChart from '../BarChart/BarChart';

import './graphicsViewer.css';
import { fetchData } from '../../../helpers/axiosHelper';
import CompanyTestSaved from '../../pages/companyPages/ComanyTestSaved/CompanyTestSaved';
const GraphicsViewer = () => {
  
  const {token, companyData, thisTest, currentTestScore} = useContext(AuthContext);
  
  const [sectorAvg, setSectorAvg] = useState();
  const [globalAvg, setGlobalAvg] = useState();

  useEffect(() => {
    const getChartsData = async () => {

      try {
        
        let values = {
          question_count: currentTestScore.count,
          sector_id: companyData.sector_id,
          test_id: thisTest[0].test_id
        };
        let resultSector = await fetchData('/statistics/sectorAvgScore', 'POST', values, token);
        setSectorAvg(resultSector.data.result);
        
        values = {
          question_count: currentTestScore.count,
          test_id: thisTest[0].test_id
        };
        let resultGlobal = await fetchData('/statistics/globalAvgScore', 'POST', values, token);
        setGlobalAvg(resultGlobal.data.result);

        
      } catch (error) {
        console.log(error);
      }
    }
    getChartsData();
  }) 

  return (
    <>
      <SimpleBarChart
        chartData={{sectorAvg, globalAvg}}
      />
      <CompanyTestSaved paramProp1="valor1" paramProp2="valor2"/>
    </>
  )
}

export default GraphicsViewer