import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
 

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/create' element={<AddProduct />} />
          <Route path='/edit/:productID' element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
