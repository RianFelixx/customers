import { Routes, Route } from 'react-router-dom';
import Customer from "./pages/Customers";

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Customer/> } />
    </Routes>
  );
}

export default App;
  