import './App.css'
import '../src/components/MyButton/MyButton.css';
import { AuthContextProvider } from './context/AuthContext/AuthContextProvider';
import { AppRoutes } from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  )
}


export default App
