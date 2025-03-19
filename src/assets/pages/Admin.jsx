
import Sidebar from '../../components/Sidebar'; // Correct relative path
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../components/AddProduct';
import ListProduct from '../../components/ListProduct';


const Admin = () => {
  return (
    <div className="lg:flex">
      <Sidebar />
       <Routes>
         <Route path='/addproduct' element={<AddProduct />}/>
         <Route path='/listProduct' element={<ListProduct />}/>
       </Routes>
    </div>
  )
}

export default Admin


  