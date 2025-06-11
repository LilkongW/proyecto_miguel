import { HashRouter as Router, Routes, Route } from 'react-router-dom';


import Inicio from './pages/Inicio';
import Formulario from './pages/Formulario';
import Resultados from './pages/Resultados';
import Bienvenida from './pages/Bienvenida';
import Final from './pages/Final';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </Router>
  );
}

export default App;
