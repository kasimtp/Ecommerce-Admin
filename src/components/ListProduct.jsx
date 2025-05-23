import { useState ,useEffect } from 'react'
import { TbTrash } from "react-icons/tb";
import { baseUrl } from "../utils/api";



const Listproduct = () => {
  const [allproducts, setAllproducts] = useState([]);


  const fetchInfo = async () => {
    await fetch(`${baseUrl}/upload`)  
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(()=> {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
     await fetch(`${baseUrl}/removeproduct`,{              
      headers:{
        Accept: 'application/json',
        'Content-type' : 'application/json',
      },
      body:JSON.stringify({id:id})
    })

    await fetchInfo();
  }

  return (
    <div className='p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7'>
      <h4 className='bold-22 p-5 uppercase'>product list</h4>
      <div className='max-h-[77vh] overflow-auto px-4 text-center'>
        <table className='w-full max-auto'>
          <thead>
            <tr className='bg-primary bold-14 sm:regular-22 text-start py-12'>
              <th className="p-2">products</th>
              <th className="p-2">Title</th>
              <th className="p-2">old price</th>
              <th className="p-2">New price</th>
              <th className="p-2">category</th>
              <th className="p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product,  i) => (
              <tr key={i} className='border-b border-slate-900/20 text-gray-20 p-6 medium-14'>
                <td className='flexStart sm:flexCenter'>
                  <img src={product.image} alt=""  height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5 my-1'/>
                </td>
                
                <td><div className='line-clamp-3'>{product.name}</div></td>
                <td>${product.old_price}</td>
                <td>${product.new_price}</td>
                <td>{product.category}</td>
                <td><div className='bold-22 pl-6 sm:pl-14'><TbTrash  onClick={()=> remove_product (product.id)}/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listproduct;
