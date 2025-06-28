import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenida a MedQR</h1>
      <p>Puedes ver tu ficha médica ingresando el código o escaneando el QR.</p>
      <Link to="/ver?slug=paula-test01">Ver ficha de Paula</Link>
    </div>
  );
}

export default App;

