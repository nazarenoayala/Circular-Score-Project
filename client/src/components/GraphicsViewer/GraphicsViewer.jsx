import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SimpleBarChart from '../BarChart/BarChart';

import './graphicsViewer.css';
import { fetchData } from '../../../helpers/axiosHelper';
import CompanyTestSaved from '../../pages/companyPages/ComanyTestSaved/CompanyTestSaved';
import { useParams, useSearchParams } from 'react-router';
const GraphicsViewer = () => {
  
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  const navType = searchParams.get('navigate');
  const [thisTest, setThisTest] = useState();
  const [sectorAvg, setSectorAvg] = useState();
  const [globalAvg, setGlobalAvg] = useState();
  const {token, companyData, setCurrentTestScore, setPrevTestScore} = useContext(AuthContext);

  // Si hay un refresco, se va a traer los resultados del último test y del penúltimo.
  useEffect(() => {
    
      const fetchScores  = async () =>{
        try {
          
          const result = await fetchData(`/statistics/oneTestHistory/${id}`,"get", null , token)
          let twoLastTests = result.data.result.slice(0,2);
          
          setThisTest(twoLastTests[0]?.test_id);
          setCurrentTestScore(twoLastTests[0].result);
          setPrevTestScore(twoLastTests[1].result);

        } catch (error) {
          console.log(error);
        }
      }
      fetchScores();
  }, []);
  console.log("thistest", thisTest);
  
  useEffect(() => {
    const getChartsData = async () => {
      if(thisTest){

        try {
          
          let values = {
            sector_id: companyData?.sector_id,
            test_id: thisTest
          };
          
          let resultSector = await fetchData('/statistics/sectorAvgScore', 'POST', values, token);
          setSectorAvg(resultSector.data.result);
          
          values = {
            test_id: thisTest
          };
          let resultGlobal = await fetchData('/statistics/globalAvgScore', 'POST', values, token);
          setGlobalAvg(resultGlobal.data.result);
          
          
        } catch (error) {
          console.log(error);
        }
      }
    }
    getChartsData();
  }, [token , thisTest, companyData?.sector_id]);
  
  return (
    <>
      <div className='chart-div'>
        <div className='chart'>
          <SimpleBarChart
            chartData={{sectorAvg, globalAvg}}
          /> 
        </div>
        <div>
          <CompanyTestSaved navFrom={navType}/>
        </div>
      </div>
    </>
  )
}

export default GraphicsViewer