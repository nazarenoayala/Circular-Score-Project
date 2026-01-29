import React, { useState } from 'react'
import '../../../components/FormCreateTest/formCreateTest.css'
import { FormCreateTest } from '../../../components/FormCreateTest/FormCreateTest'

const initialValues = {
  test_name:'',
  prompt:'',
  is_public:''
}




const CreateTest = () => {
  const [newTest, setNewTest] = useState(initialValues)
   
   const handleChange = (e) =>{
    const {name, value, checked} = e.target;
    if(!checked){
      setNewTest(e.target.checked)
    }else{
      setNewTest({...newTest, [name]:value})
    }
    }
console.log(newTest);

  return (

    <>
      <div className='create-test-container'>
        <main>
          <header>
            <h1 className='title-form'>Creación de test</h1>
          </header>
          <FormCreateTest
            newTest={newTest}
            handleChange={handleChange}/>
        </main>
      </div>
    </>
  )
}

export default CreateTest