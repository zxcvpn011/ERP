
import FormikPage from './Pages/FormikPage/Formik.jsx'
import './styles/App.css';
import FormPage from './Pages/Form/Form.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Materials from './Pages/Materials/Materials.jsx';



function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route key={'index'} element={<FormikPage />} path={'/'} />
            <Route key={'form'} element={<FormPage />} path={'/form'} />
            <Route key={'materials'} element={<Materials />} path={'/materials'} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
